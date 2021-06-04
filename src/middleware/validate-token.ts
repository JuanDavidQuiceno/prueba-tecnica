import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")
    if (!token) return res.status(401).json({ error: "Acceso denegado"})
    if(token.split(" ")[0] !== 'Bearer') return res.status(401).json({ error: "Falta parametro \"Bearer\" "})
    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET)
        req.body = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}