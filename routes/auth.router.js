const passport = require('passport');
const express = require('express');
const router = express.Router();

const AuthService = require('../server/auth.service');
const service = new AuthService();

router.post('/login',
    passport.authenticate('local', { session: false }), //Por defecto se llama 'local'
    async (req, res, next) => {
        try {
            const user = req.user;
            const payload = await service.signToken(user);
            res.status(201).json(payload);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const resp = await service.sendRecoveryPassword(email);
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
);

//Agregar schema ->
router.post('/reset-password',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;
            const resp = await service.resetPassword(token, newPassword);
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;