import  { Router } from "express";
import { registre, login, updateUser} from "../controller/user.controller";
import { createCategoria, getCategorias, updateCategoria, deleteCategoria} from "../controller/categoria.controller";
import { createProducto, getProductos, updateProducto, deleteProducto} from "../controller/producto.controller";
import { verifyToken } from "../middleware/validate-token";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

router.post('/login', login)
router.post('/registre', registre)
router.put('/user/:id', verifyToken, updateUser)

router.get('/categorias', verifyToken, getCategorias)
router.post('/categorias', verifyToken, createCategoria)
router.put('/categorias/:id', verifyToken, updateCategoria)
router.delete('/categorias/:id', verifyToken, deleteCategoria)

router.get('/productos', verifyToken, getProductos)
router.post('/productos', verifyToken, createProducto)
router.put('/productos/:id', verifyToken, updateProducto)
router.delete('/productos/:id', verifyToken, deleteProducto)

export default router