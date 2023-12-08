// src/app.ts
import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Express = express()

const port: number = 3000
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Express + TypeScirpt + Prisma !!',
  })
})

app.post('/post',async (req, res)=>{
    try {
    const { name, email } = req.body
    const user = await prisma.user.create({
        data: {
          name ,
          email ,
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


app.listen(port, () => console.log(`Application is running on http://localhost:${port}/`))


