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
const about_1 = __importDefault(require("./router/about"));
const index_1 = __importDefault(require("./router/index"));
app.use(express_1.default.json());
app.set('views', './src/view');
app.set('view engine', 'ejs');
app.listen(port, () => console.log(`Application is running on http://localhost:${port}/`));
app.use('/about', about_1.default);
app.use('/test', index_1.default);
app.get('/', (req, res) => {
    res.render('index', { title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!' });
});
app.get('/aboutusers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
    res.render('users', {
        title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!',
        users
    });
}));
app.get('/aboutposts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            published: true || false,
            authorId: true,
            createdAt: true,
            updatedAt: true
        }
    });
    res.render('posts', {
        title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!',
        posts
    });
}));
//APIs service
app.post('/create/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const user = yield prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.json(Object.assign(Object.assign({}, user), { message: "Crate data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.get('/finduser/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.findMany({
            where: {
                id: Number(id), // Assuming the ID is an integer, convert it if needed
            },
            include: {
                posts: true
            }
        });
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.get('/post/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield prisma.post.findUnique({
            where: { id: Number(id) },
        });
        res.json(post);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.get('/posts/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findMany();
        res.json(post);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
// app.post('/post/create', async (req, res) => { //test create Poste without authorId in params
//     try {
//         const { authorId, title, content, published } = req.body
//         const userFeed = await prisma.post.create({
//             data: { 
//                 title,
//                 content,
//                 authorId, 
//                 published 
//             },
//         })
//         res.json(userFeed);
//     } catch (error: any) {
//         console.log(error.message)
//         res.status(500).json({
//             message: "Internal Server Error or something went wrong",
//         })
//     }
// })
app.post('/post/create/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content, published } = req.body;
        const createdPost = yield prisma.post.create({
            data: {
                title,
                content,
                published,
                author: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
        res.json(Object.assign(Object.assign({}, createdPost), { message: "Crate data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.get('/user/post/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const posts = yield prisma.user
            .findUnique({
            where: {
                id: Number(id),
            },
        })
            .posts({
            where: { published: true },
        });
        res.json(posts);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.put('/edit/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const edituser = yield prisma.user.update({
            where: {
                id: Number(id)
            },
            data: { name, email }
        });
        res.json(Object.assign(Object.assign({}, edituser), { message: "Change data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.put('/edit/postId/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content, published } = req.body;
        const editpost = yield prisma.post.update({
            where: {
                id: Number(id)
            },
            data: { title, content, published }
        });
        res.json(Object.assign(Object.assign({}, editpost), { message: "Change data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
        res.json(error.message);
    }
}));
app.put('/edit/user/:authorId/post/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, authorId } = req.params;
        const { title, content, published } = req.body;
        const posts = yield prisma.post.update({
            where: {
                id: Number(id),
                authorId: Number(authorId)
            },
            data: {
                title,
                content,
                published
            }
        });
        res.json(Object.assign(Object.assign({}, posts), { message: "Change data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.delete('/delete/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({
            deleteUser,
            message: "delete data successfully",
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.delete('/post/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { authorId } = req.body;
        const deletePost = yield prisma.post.delete({
            where: {
                id: Number(id),
                authorId: Number(authorId),
            },
        });
        res.json(Object.assign(Object.assign({}, deletePost), { message: "delete data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
app.delete('/deletePost/userId/:authorId/postId/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, authorId } = req.params;
        const deletePost = yield prisma.post.deleteMany({
            where: {
                id: Number(id),
                authorId: Number(authorId)
            },
        });
        res.json(Object.assign(Object.assign({}, deletePost), { message: "delete data successfully" }));
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        });
    }
}));
