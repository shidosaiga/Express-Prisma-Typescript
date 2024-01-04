import express, { Express, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()

const prisma = new PrismaClient()
const app: Express = express()

router.get('/index', (req, res) => {
    try {
        res.render('cover', { title: 'Hello this is Restful API Express + TypeScirpt + Prisma made by Apirak Kaewpachum !!' })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})


export default router;