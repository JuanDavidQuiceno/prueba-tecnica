import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Producto } from "../entity/producto";

const Joi = require('@hapi/joi');

const schemaPostProducto = Joi.object({
    nombre: Joi.string().max(255).required(),
    categoria: Joi.number().required(),
    precio: Joi.number().required(),
    inventario: Joi.number().required(),
})

const schemaUpdateProducto = Joi.object({
    nombre: Joi.string().max(255),
    categoria: Joi.number(),
    precio: Joi.number(),
    inventario: Joi.number(),
})

export const getProductos = async(req: Request, res: Response): Promise<Response>=> {
    try{
        const users = await getRepository(Producto).find();
        return res.status(201).json(users);

    }catch(e){
        return res.status(404).json(
            {
                msg: "Tenemos problemas para realizar la consulta"
            }
        );
    }
}

export const createProducto = async(req: Request, res: Response): Promise<Response>=> {

    const { error } = schemaPostProducto.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
    
    try{
        const newProduct = getRepository(Producto).create(req.body);
        const result = await getRepository(Producto).save(newProduct);
        return res.status(201).json({"producto":result, msg: "Producto creado"});
    }catch(error){
        return res.status(404).json({error})
    }
}

export const updateProducto = async(req: Request, res: Response): Promise<Response>=> {

    const { error } = schemaUpdateProducto.validate(req.body)

    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    try{
        const producto = await getRepository(Producto).findOne(req.params.id)
        if(producto){
            const productoCombine = getRepository(Producto).merge(producto, req.body);
            const results = await getRepository(Producto).save(productoCombine);
            return res.status(201).json({msg: "Producto Actualizado", 'producto': results});
        }else{
            return res.status(401).json({msg: "Parece que el producto no existe"});
        }
    }catch(error){
        return res.status(404).json({error})
    }
}

export const deleteProducto = async(req: Request, res: Response): Promise<Response>=> {
    const producto = await getRepository(Producto).findOne(req.params.id)
    if(producto){
        const deleteProducto = await getRepository(Producto).delete(req.params.id);
        return res.status(201).json({"producto":deleteProducto, msg: "Producto Eliminado"});
    }else{
        return res.status(401).json({msg: "Parece que el producto no existe"});
    }
}