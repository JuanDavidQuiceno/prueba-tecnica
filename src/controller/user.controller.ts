import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

const bcrypt = require('bcrypt');
// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    firsname: Joi.string().min(1).max(255).required(),
    lastname: Joi.string().min(1).max(255).required(),
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

export const getUser = async(req: Request, res: Response): Promise<Response>=> {
    try{
        const users = await getRepository(User).findOne(req.params.id);
        return res.status(201).json(users);
    }catch(e){
        return res.status(404).json(
            {
                msg: "Tenemos problemas para realizar la consulta"
            }
        );
    }
}

export const createUsers = async(req: Request, res: Response): Promise<Response>=> {
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
        return res.status(402).json({error})
    }
}