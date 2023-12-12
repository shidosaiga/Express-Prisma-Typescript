// src/app.ts
import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app: Express = express()
const port: number = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!'
    })
})

app.get('/about', (req, res) => {
    res.json({
        contract:{
            Email:'Netapirak@gmail.com',
            Phone:'095-604-3539',
            MadeBy:'Apirak kaewpachum',
            College:'Pongsawadi technological college'
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
            message: "Internal Server Error or something went wrong",
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
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.get('/finduser/:id', async (req, res) => {
    try {
        const { id } = req.params
        
        const user = await prisma.user.findMany({
            where: {
                id: Number(id), // Assuming the ID is an integer, convert it if needed
            },
            include:{
                posts:true
            }
        })
        res.json(user);

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
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
            message: "Internal Server Error or something went wrong",
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
            message: "Internal Server Error or something went wrong",
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
//             message: "Internal Server Error or something went wrong",
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
            message: "Internal Server Error or something went wrong",
            
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
            message: "Internal Server Error or something went wrong",
        })
        res.json(error.message)
    }
})

app.put('/edit/user/:authorId/post/:id', async (req, res) => {
    try {
        const {  id,authorId } = req.params
        const {title , content,published} = req.body
        const posts = await prisma.post.update({
            where:{
                id: Number(id),
                authorId: Number(authorId)
                
            },
            data:{ 
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
            message: "Internal Server Error or something went wrong",
        })
    }
})

app.delete('/delete/user/:id',async (req,res) => {
    try {
        const {id} = req.params
        const deleteUser = await prisma.user.delete({
            where:{
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
        const {authorId} = req.body
        const deletePost = await prisma.post.delete({
            where:{
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
        const { id,authorId } = req.params
        const deletePost = await prisma.post.deleteMany({
            where:{
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
