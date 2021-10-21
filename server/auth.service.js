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
        if (!isMatch) throw boom.unauthorized();;

        delete user.dataValues.password;
        return user;
    }

    async signToken(user) {
        const payload = { id: user.id, role: user.role }

        const token = await jwt.sign(payload, jwtKey, { expiresIn: '1h' });

        return { user, token };
    }

    async sendMail(email) {
        const user = await service.findByEmail(email);
        if (!user) throw boom.notFound("Email not found");

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
            to: user.email,
            subject: "Correo de prueba",
            text: "Hola!",
            html: "<b>Hola!</b>",
        });

        /*  console.log(info.messageId);
         console.log(nodemailer.getTestMessageUrl(info)); */

        return { message: 'Email sent' };
    };

}

module.exports = AuthService;