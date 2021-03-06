"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategorias = void 0;
var typeorm_1 = require("typeorm");
var categoria_1 = require("../entity/categoria");
var Joi = require('@hapi/joi');
var schemaPostCategoria = Joi.object({
    categoria: Joi.string().max(255).required(),
});
var getCategorias = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categorias, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).find()];
            case 1:
                categorias = _a.sent();
                return [2 /*return*/, res.status(201).json({ categorias: categorias })];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, res.status(404).json({
                        msg: "Tenemos problemas consultar las categorias"
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategorias = getCategorias;
var createCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, newCategory, categorias, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = schemaPostCategoria.validate(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({ error: error.details[0].message })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                newCategory = typeorm_1.getRepository(categoria_1.Categoria).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).save(newCategory)];
            case 2:
                _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).find()];
            case 3:
                categorias = _a.sent();
                return [2 /*return*/, res.status(201).json({ msg: "categorias creada", categorias: categorias })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: error_1 })
                    // return res.status(404).json(
                    //     {
                    //         msg: "Por alguna razon no se creo la categoria, intenta nuevamente"
                    //     }
                    // );
                ];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCategoria = createCategoria;
var updateCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, categoria, combineCategoria, categorias, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = schemaPostCategoria.validate(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({ error: error.details[0].message })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).findOne(req.params.id)];
            case 2:
                categoria = _a.sent();
                if (!categoria) return [3 /*break*/, 5];
                combineCategoria = typeorm_1.getRepository(categoria_1.Categoria).merge(categoria, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).save(combineCategoria)];
            case 3:
                _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).find()];
            case 4:
                categorias = _a.sent();
                return [2 /*return*/, res.status(201).json({ msg: "Categoria Actualizada", 'categorias': categorias })];
            case 5: return [2 /*return*/, res.status(401).json({ msg: "Parece que la categoria no existe" })];
            case 6: return [3 /*break*/, 8];
            case 7:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(404).json({
                        msg: "Por alguna razon no se creo el usuario, intenta nuevamente"
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateCategoria = updateCategoria;
var deleteCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoria, deleteCategoria_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).findOne(req.params.id)];
            case 1:
                categoria = _a.sent();
                if (!categoria) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getRepository(categoria_1.Categoria).delete(req.params.id)];
            case 2:
                deleteCategoria_1 = _a.sent();
                return [2 /*return*/, res.status(201).json({ "categoria": deleteCategoria_1, msg: "Categoria Eliminada" })];
            case 3: return [2 /*return*/, res.status(401).json({ msg: "Parece que la categoria no existe" })];
        }
    });
}); };
exports.deleteCategoria = deleteCategoria;
