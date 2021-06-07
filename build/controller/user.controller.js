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
exports.updateUser = exports.registre = exports.login = exports.getUsers = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
// validation
var Joi = require('@hapi/joi');
var schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});
var schemaRegister = Joi.object({
    firsname: Joi.string().min(1).max(255).required(),
    lastname: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).max(1024).required()
});
var schemaUpdate = Joi.object({
    firsname: Joi.string().min(1).max(255),
    lastname: Joi.string().min(1).max(255),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).max(1024).required()
});
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(201).json(users)];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, res.status(404).json({
                        msg: "Tenemos problemas para realizar la consulta"
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, validPassword, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = schemaLogin.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).json({ error: error.details[0].message })];
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ error: 'Usuario no encontrado' })];
                return [4 /*yield*/, bcrypt.compare(req.body.password, user.password)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword)
                    return [2 /*return*/, res.status(400).json({ error: 'contraseña no válida' })
                        // create token
                    ];
                // create token
                try {
                    token = jwt.sign({
                        email: req.body.email,
                        password: user.password
                    }, process.env.TOKEN_SECRET);
                    return [2 /*return*/, res.status(201).json({
                            token: token,
                            user: {
                                firsname: user.firsname,
                                lastname: user.lastname,
                                email: user.email,
                            }
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(404).json({ error: "Error de autenticación" })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var registre = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, isEmailExist, salt, password, newUser, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = schemaRegister.validate(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({ error: error.details[0].message })];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ email: req.body.email })];
            case 1:
                isEmailExist = _a.sent();
                if (isEmailExist) {
                    return [2 /*return*/, res.status(401).json({ error: 'Email ya registrado' })];
                }
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 3:
                password = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                newUser = typeorm_1.getRepository(User_1.User).create({
                    firsname: req.body.firsname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: password
                });
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 5:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json({ msg: "usuario creado exitosamente" })];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: error_1 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.registre = registre;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, userUpdate, results, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = schemaUpdate.validate(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({ error: error.details[0].message })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 4];
                userUpdate = typeorm_1.getRepository(User_1.User).merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(userUpdate)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.status(201).json({ msg: "Usuario Actualizado", 'user': results })];
            case 4: return [2 /*return*/, res.status(401).json({ msg: "Usuario no encontrado" })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(404).json({ error: error_2 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
