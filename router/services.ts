import express, { Express, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
//import { request } from 'http'


const prisma = new PrismaClient()
//const app: Express = express()

// CRUD concept with GET: POST: PUT: DELETE:
class Services {
    static async GetallOfUser(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                include: {
                    posts: true
                }
            })
            res.json(users);
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                message: "Internal Server Error or something went wrong",
            })
        }
    }

    static async GetUser(req: Request, res: Response) {
        try {

            const users = await prisma.user.findMany()
            res.json(users);
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                message: "Internal Server Error or something went wrong",
            })
        }
    }
    static async CrateUser(req: Request, res: Response) {
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
    }
    static async FindUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findMany({
                where: {
                    id: Number(id), // Assuming the ID is an integer, convert it if needed
                },
                include: {
                    posts: true
                }
            })
            res.json(user);

        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                message: "Internal Server Error or something went wrong",
            })
        }
    }
    static async FindPost(req: Request, res: Response) {
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
    }
    static async GetAllPost(req: Request, res: Response) {
        try {
            const post = await prisma.post.findMany()
            res.json(post);

        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                message: "Internal Server Error or something went wrong",
            })
        }
    }
    static async GetPostOfAuthorId(req: Request, res: Response) {
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
    }
    static async CratePostByUserId(req: Request, res: Response) {
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
    }
    static async CratePost(req: Request, res: Response) {
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
                message: "Internal Server Error or something went wrong",
            })
        }
    }
    static async EditUserById(req: Request, res: Response) {
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
    }
    static async EditPostById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { title, content, published, authorId } = req.body
            const editpost = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: { title, content, published, authorId }
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
    }
    static async EditPostByAuthorId(req: Request, res: Response) {
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
    }
    static async DeleteUser(req: Request, res: Response) {
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
    }
    static async DeletePostById(req: Request, res: Response) {
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
    }
    static async DeletePostRefByAuthorId(req: Request, res: Response) {
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
    }
}



//Render class <---show data to client site  

class Render {
    static async AboutUser(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            // Render the 'aboutUser' EJS view with the users data
            res.render('users', {
                title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!',
                users
            })
        } catch (error: any) {
            console.error(error.message);
            res.status(500).json({
                message: 'Internal Server Error or something went wrong',
            });
        }
    }
    static async AboutPost(req: Request, res: Response) {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                published: true || false,
                authorId: true ,
                createdAt: true,
                updatedAt: true
            }
        })
        res.render('posts', {
            title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!',
            posts

        })
    }
}


export { Services, Render }; 