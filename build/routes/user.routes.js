"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var categoria_controller_1 = require("../controller/categoria.controller");
var producto_controller_1 = require("../controller/producto.controller");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    });
});
router.get('/users', user_controller_1.getUsers);
router.get('/users/:id', user_controller_1.getUser);
router.post('/users', user_controller_1.createUsers);
router.get('/categorias', categoria_controller_1.getCategorias);
router.post('/categorias', categoria_controller_1.createCategoria);
router.put('/categorias/:id', categoria_controller_1.updateCategoria);
router.delete('/categorias/:id', categoria_controller_1.deleteCategoria);
router.get('/productos', producto_controller_1.getProductos);
router.post('/productos', producto_controller_1.createProducto);
router.put('/productos/:id', producto_controller_1.updateProducto);
router.delete('/productos/:id', producto_controller_1.deleteProducto);
exports.default = router;
