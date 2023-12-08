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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Hello Express + TypeScirpt + Prisma !!',
    });
});
app.post('/post/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const user = yield prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}));
app.get('/findUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}));
app.listen(port, () => console.log(`Application is running on http://localhost:${port}/`));
