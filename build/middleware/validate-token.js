"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jwt = require('jsonwebtoken');
// middleware to validate token (rutas protegidas)
var verifyToken = function (req, res, next) {
    var tokenn = req.header("Authorization");
    if (!tokenn)
        return res.status(406).json({ error: "Acceso denegado" });
    if (tokenn.split(" ")[0] !== 'Bearer')
        return res.status(401).json({ error: "Falta parametro \"Bearer\" " });
    try {
        var verified = jwt.verify(tokenn.split(" ")[1], process.env.TOKEN_SECRET);
        req.method = verified;
        next(); // continuamos
    }
    catch (error) {
        res.status(406).json({ error: 'token no es válido' });
    }
};
exports.verifyToken = verifyToken;
