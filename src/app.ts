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
        contract:{
            Email:'Netapirak@gmail.com',
            Phone:'095-604-3539'
        }
    })
})

app.listen(port, () => console.log(`Application is running on http://localhost:${port}/`))


app.post('/create/user', async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        })
        res.json({
            ...user,
            message: "Crate data successfully",
        });
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})

app.get('/users', async (req, res) => {
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

app.get('/finduser/:id', async (req, res) => {
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

app.get('/posts/', async (req, res) => {
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
//             message: "Internal Server Error",
//         })
//     }
// })

app.post('/post/create/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {  title, content, published } = req.body
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
            message: "Internal Server Error",
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
            message: "Internal Server Error",
        })
    }
})

app.put('/edit/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {name , email} = req.body
        const edituser = await prisma.user.update({
            where:{
                id: Number(id)
            },
            data:{ name, email}
        })
       
        res.json({
            ...edituser,
            message: "Change data successfully",
        });
        
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
            
        })
    }
})



app.put('/edit/postId/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {title , content,published} = req.body
        const editpost = await prisma.post.update({
            where:{
                id: Number(id)
            },
            data:{ title , content,published}
        })

        res.json({
            ...editpost,
            message: "Change data successfully",
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
        res.json(error.message)
    }
})

app.put('/edit/user/post/:id', async (req, res) => {
    try {
        const {  id } = req.params
        const {authorId,title , content,published} = req.body
        const posts = await prisma.post.update({
            where:{
                id: Number(id)
            },
            data:{ 
                authorId,
                title ,
                 content,
                 published}
            })

        res.json({
            ...posts,
            message: "Change data successfully",
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
})
