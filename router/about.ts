// src/app.ts
import express, { Express, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()

const prisma = new PrismaClient()
const app: Express = express()

router.get('/', (req, res) => {
    try {
        res.json({
            contract: {
                Email: 'Netapirak@gmail.com',
                Phone: '095-604-3539',
                MadeBy: 'Apirak kaewpachum',
                College: 'Pongsawadi technological college'
            }
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})
router.get('/all', async (req, res) => {
    try {

        const users = await prisma.user.findMany({
            include:{
                posts:true
            }
        })
        res.json(users);
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error or something went wrong",
        })
    }
})

export default router;