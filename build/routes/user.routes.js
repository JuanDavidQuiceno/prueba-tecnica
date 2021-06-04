"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var categoria_controller_1 = require("../controller/categoria.controller");
var producto_controller_1 = require("../controller/producto.controller");
var validate_token_1 = require("../middleware/validate-token");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    });
});
router.post('/login', user_controller_1.login);
router.post('/registre', user_controller_1.registre);
router.put('/user/:id', validate_token_1.verifyToken, user_controller_1.updateUser);
router.get('/categorias', validate_token_1.verifyToken, categoria_controller_1.getCategorias);
router.post('/categorias', validate_token_1.verifyToken, categoria_controller_1.createCategoria);
router.put('/categorias/:id', validate_token_1.verifyToken, categoria_controller_1.updateCategoria);
router.delete('/categorias/:id', validate_token_1.verifyToken, categoria_controller_1.deleteCategoria);
router.get('/productos', validate_token_1.verifyToken, producto_controller_1.getProductos);
router.post('/productos', validate_token_1.verifyToken, producto_controller_1.createProducto);
router.put('/productos/:id', validate_token_1.verifyToken, producto_controller_1.updateProducto);
router.delete('/productos/:id', validate_token_1.verifyToken, producto_controller_1.deleteProducto);
exports.default = router;
