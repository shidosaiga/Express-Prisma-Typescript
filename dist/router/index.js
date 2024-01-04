"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
router.get('/index', (req, res) => {
    try {
        res.render('cover', { title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
});
exports.default = router;
