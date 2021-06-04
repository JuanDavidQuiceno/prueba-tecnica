import  { Router } from "express";
import { createUsers, getUsers, getUser} from "../controller/user.controller";
import { createCategoria, getCategorias, updateCategoria, deleteCategoria} from "../controller/categoria.controller";
import { createProducto, getProductos, updateProducto, deleteProducto} from "../controller/producto.controller";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUsers)

router.get('/categorias', getCategorias)
router.post('/categorias', createCategoria)
router.put('/categorias/:id', updateCategoria)
router.delete('/categorias/:id', deleteCategoria)

router.get('/productos', getProductos)
router.post('/productos', createProducto)
router.put('/productos/:id', updateProducto)
router.delete('/productos/:id', deleteProducto)

export default router