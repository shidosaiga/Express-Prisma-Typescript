// src/app.ts
import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app: Express = express()
const port: number = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!',
    })
})

app.post('/create/user', async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await prisma.user.create({
            data: {
                name,
                email,

            },
        })
        res.json(user);
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get('/findUsers', async (req, res) => {
    try {
        const { name, email } = req.body
        const users = await prisma.user.findMany()
        res.json(users);
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get('/find/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findMany({
            where: {
                id: Number(id) // Assuming the ID is an integer, convert it if needed
            },
        })
        res.json(user);

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})
app.get('/post/:id', async (req, res) => {
    try {
        const { id }: { id?: string } = req.params

        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        })
        res.json(post);

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get('/post/', async (req, res) => {
    try {
        const post = await prisma.post.findMany()
        res.json(post);

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.post('/feed/creat', async (req, res) => {
    try {

        const { authorId, title, content, published } = req.body
        const userFeed = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                published
            },
        })
        res.json(userFeed);

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})




app.listen(port, () => console.log(`Application is running on http://localhost:${port}/`))


