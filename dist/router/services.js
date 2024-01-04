"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
function getHello(req, res) {
    res.json({
        title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!'
    });
}
exports.default = getHello;
