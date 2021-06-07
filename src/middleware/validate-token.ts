import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const tokenn = req.header("Authorization")
    if (!tokenn) return res.status(406).json({ error: "Acceso denegado"})
    if(tokenn.split(" ")[0] !== 'Bearer') return res.status(401).json({ error: "Falta parametro \"Bearer\" "})
    try {
        const verified = jwt.verify(tokenn.split(" ")[1], process.env.TOKEN_SECRET)
        req.method = verified
        next() // continuamos
    } catch (error) {
        res.status(406).json({error: 'token no es válido'})
    }
} 