import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Categoria } from "../entity/categoria";
const Joi = require('@hapi/joi');

const schemaPostCategoria = Joi.object({
    categoria: Joi.string().max(255).required(),
})

export const getCategorias = async(req: Request, res: Response): Promise<Response>=> {
    try{
        const categorias = await getRepository(Categoria).find();
        return res.status(201).json(categorias);

    }catch(e){
        return res.status(404).json(
            {
                msg: "Tenemos problemas consultar las categorias"
            }
        );
    }
}

export const createCategoria = async(req: Request, res: Response): Promise<Response>=> {

    // validate user
    const { error } = schemaPostCategoria.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    try{
        const newCategory = getRepository(Categoria).create(req.body);
        await getRepository(Categoria).save(newCategory);
        return res.status(201).json({msg: "categorias creada"});
    }catch(error){
        return res.status(404).json({error})
        // return res.status(404).json(
        //     {
        //         msg: "Por alguna razon no se creo la categoria, intenta nuevamente"
        //     }
        // );
    }
}

export const updateCategoria = async(req: Request, res: Response): Promise<Response>=> {

    // validate user
    const { error } = schemaPostCategoria.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    try{
        const categoria = await getRepository(Categoria).findOne(req.params.id)
        if(categoria){
            const combineCategoria = getRepository(Categoria).merge(categoria, req.body);
            const results = await getRepository(Categoria).save(combineCategoria);
            return res.status(201).json({msg: "Categoria Actualizada", 'Categoria': results});
        }else{
            return res.status(401).json({msg: "Parece que la categoria no existe"});
        }
    }catch(e){
        return res.status(404).json(
            {
                msg: "Por alguna razon no se creo el usuario, intenta nuevamente"
            }
        );
    }
}

export const deleteCategoria = async(req: Request, res: Response): Promise<Response>=> {
    const categoria = await getRepository(Categoria).findOne(req.params.id)
    if(categoria){
        const deleteCategoria = await getRepository(Categoria).delete(req.params.id);
        return res.status(201).json({"categoria":deleteCategoria, msg: "Categoria Eliminada"});
    }else{
        return res.status(401).json({msg: "Parece que la categoria no existe"});
    }
}