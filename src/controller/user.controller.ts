import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
// validation
const Joi = require('@hapi/joi');

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaRegister = Joi.object({
    firsname: Joi.string().min(1).max(255).required(),
    lastname: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaUpdate = Joi.object({
    firsname: Joi.string().min(1).max(255),
    lastname: Joi.string().min(1).max(255),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

export const getUsers = async(req: Request, res: Response): Promise<Response>=> {
    try{
        const users = await getRepository(User).find();
        return res.status(201).json(users);

    }catch(e){
        return res.status(404).json(
            {
                msg: "Tenemos problemas para realizar la consulta"
            }
        );
    }
}

export const login = async(req: Request, res: Response): Promise<Response>=> {

    
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await getRepository(User).findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

     // create token
    try {
        const token = jwt.sign({
            email: req.body.email,
            password: user.password
        }, process.env.TOKEN_SECRET)
        
        return res.json({
            token: token,
            user: {
                firsname: user.firsname,
                lastname: user.lastname,
                email: user.email,
            }
        })
    } catch (error) {
        return res.status(404).json({ error: "Error de autenticación"})
    }
}

export const registre = async(req: Request, res: Response): Promise<Response>=> {
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const isEmailExist = await getRepository(User).findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(401).json(
            {error: 'Email ya registrado'}
        )
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    try{
        const newUser = getRepository(User).create({
            firsname: req.body.firsname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password
        });
        const result = await getRepository(User).save(newUser);
        return res.status(201).json({"user":result, msg: "usuario creado exitosamente"});
    } catch (error) {
        return res.status(404).json({error})
    }
}

export const updateUser = async(req: Request, res: Response): Promise<Response>=> {

    const { error } = schemaUpdate.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    try{
        const user = await getRepository(User).findOne(req.params.id)
        if(user){
            const userUpdate = getRepository(User).merge(user, req.body);
            const results = await getRepository(User).save(userUpdate);
            return res.status(201).json({msg: "Usuario Actualizado", 'user': results});
        }else{
            return res.status(401).json({msg: "Usuario no encontrado"});
        }
    }catch(error){
        return res.status(404).json({error})
    }
}