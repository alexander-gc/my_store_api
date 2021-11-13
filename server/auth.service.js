const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { jwtKey, emailPass, emailUser } = require('./../config/keys');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {

    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) throw boom.unauthorized();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw boom.unauthorized();

        delete user.dataValues.password;
        return user;
    }

    async signToken(user) {
        const payload = { id: user.id, role: user.role }
        const token = await jwt.sign(payload, jwtKey, { expiresIn: '1h' });
        return { user, token };
    }

    async sendRecoveryPassword(email) {
        const user = await service.findByEmail(email);
        if (!user) throw boom.notFound("Email not found");

        const { token } = await this.signToken(user);

        const subject = "Password recovery";
        const html = `<b>Use this token to recovery your password: ${token}</b>`

        const resp = await this.sendMail(user.email, subject, html);

        user.recoveryPassword = token;
        user.save();

        return resp;
    }

    async resetPassword(token, newPassword) {

        //Enviar valores específicos en el return ->

        try {
            const { id } = await jwt.verify(token, jwtKey);
            const user = await service.findOne(id);

            if (user.recoveryPassword !== token) throw boom.unauthorized();

            await user.update({
                password: bcrypt.hashSync(newPassword, 10),
                recoveryPassword: null
            });

            return { msg: "Password changed successfully" };
        } catch (error) {
            throw boom.unauthorized(error.message);
        }

    }

    async sendMail(email, subject, html) {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        const info = await transporter.sendMail({
            from: emailUser,
            to: email,
            subject: subject,
            html: html
        });

        //console.log(nodemailer.getTestMessageUrl(info)); 

        return { message: 'Email sent' };
    };

}

module.exports = AuthService;