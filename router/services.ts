import express, { Express, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'


const prisma = new PrismaClient()
const app: Express = express()


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
}


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
                authorId: true,
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