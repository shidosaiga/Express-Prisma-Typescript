// src/app.ts
import express, { Express, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'

const prisma = new PrismaClient()
const app: Express = express()
const port: number = 3000
import about from './router/about'
import testindex from './router/index'
import { Services, Render } from './router/services' // Module exprots file location


app.use(express.json());
app.set('views', './src/view');
app.set('view engine', 'ejs');
 
app.listen(port, () => console.log(`Application is running on http://localhost:${port}/`))

app.use('/about', about)
app.use('/test', testindex)

app.get('/', (req, res) => {
    res.render('index', { title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!' })
})

// Render to client
app.get('/aboutusers',Render.AboutUser)
app.get('/aboutposts', Render.AboutPost)

//APIs service

app.get('/getall',Services.GetallOfUser)//test Module exprots
app.get('/users', Services.GetUser)
app.get('/finduser/:id', Services.FindUser)
app.get('/post/:id', Services.FindPost)
app.get('/posts/', Services.GetAllPost)

app.post('/create/user', Services.CrateUser)
app.post('/post/create/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, published } = req.body
        const createdPost = await prisma.post.create({
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
        })
        res.json({
            ...createdPost,
            message: "Crate data successfully",
        });

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.get('/user/post/:id', async (req, res) => {
    try {
        const { id } = req.params

        const posts = await prisma.user
            .findUnique({
                where: {
                    id: Number(id),
                },
            })
            .posts({
                where: { published: true },
            })

        res.json(posts)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.put('/edit/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body
        const edituser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: { name, email }
        })

        res.json({
            ...edituser,
            message: "Change data successfully",
        });

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",

        })
    }
})



app.put('/edit/postId/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, published } = req.body
        const editpost = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: { title, content, published }
        })

        res.json({
            ...editpost,
            message: "Change data successfully",
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
        res.json(error.message)
    }
})

app.put('/edit/user/:authorId/post/:id', async (req, res) => {
    try {
        const { id, authorId } = req.params
        const { title, content, published } = req.body
        const posts = await prisma.post.update({
            where: {
                id: Number(id),
                authorId: Number(authorId)

            },
            data: {
                title,
                content,
                published
            }
        })

        res.json({
            ...posts,
            message: "Change data successfully",
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.delete('/delete/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.json({
            deleteUser,
            message: "delete data successfully",
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.delete('/post/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { authorId } = req.body
        const deletePost = await prisma.post.delete({
            where: {
                id: Number(id),
                authorId: Number(authorId),
            },
        })
        res.json({
            ...deletePost,
            message: "delete data successfully",
        })

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.delete('/deletePost/userId/:authorId/postId/:id', async (req, res) => {
    try {
        const { id, authorId } = req.params
        const deletePost = await prisma.post.deleteMany({
            where: {
                id: Number(id),
                authorId: Number(authorId)
            },
        })
        res.json({
            ...deletePost,
            message: "delete data successfully",
        })

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

