import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Categoria } from "../entity/categoria";
import { Producto } from "../entity/producto";

const Joi = require('@hapi/joi');

const schemaPostProducto = Joi.object({
    nombre: Joi.string().min(1).max(255).required(),
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
        // const produtos = await getRepository(Producto).find();
        const produtos = await getRepository(Producto).createQueryBuilder("producto").leftJoinAndSelect("producto.categoria", "categoria").getMany();
        return res.status(201).json({'productos': produtos});

    }catch(e){
        return res.status(404).json(
            {
                msg: "Tenemos problemas para realizar la consulta \e"
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
        await getRepository(Producto).save(newProduct);
        const produtos = await getRepository(Producto).createQueryBuilder("producto").leftJoinAndSelect("producto.categoria", "categoria").getMany();
        return res.status(201).json({msg: "Producto creado", "productos":produtos});
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
            const produtos = await getRepository(Producto).createQueryBuilder("producto").leftJoinAndSelect("producto.categoria", "categoria").whereInIds(req.params.id).getOne();
            return res.status(201).json({msg: "Producto Actualizado", 'producto': produtos});
        }else{
            return res.status(401).json({error: "Parece que el producto no existe"});
        }
    }catch(error){
        return res.status(404).json(error)
    }
}

export const deleteProducto = async(req: Request, res: Response): Promise<Response>=> {
    try{
        const producto = await getRepository(Producto).findOne(req.params.id)
        if(producto){
            const deleteProducto = await getRepository(Producto).delete(req.params.id);
            return res.status(201).json({"producto":deleteProducto, msg: "Producto Eliminado"});
        }else{
            return res.status(401).json({error: "Parece que el producto no existe"});
        }
    }catch(error){
        return res.status(404).json({error})
    }
}