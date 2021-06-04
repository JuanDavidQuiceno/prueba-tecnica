"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jwt = require('jsonwebtoken');
// middleware to validate token (rutas protegidas)
var verifyToken = function (req, res, next) {
    var token = req.header("Authorization");
    if (!token)
        return res.status(401).json({ error: "Acceso denegado" });
    if (token.split(" ")[0] !== 'Bearer')
        return res.status(401).json({ error: "Falta parametro \"Bearer\" " });
    try {
        var verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
        req.body = verified;
        next(); // continuamos
    }
    catch (error) {
        res.status(400).json({ error: 'token no es válido' });
    }
};
exports.verifyToken = verifyToken;
