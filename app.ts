import express, { Express, Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'

// const prisma = new PrismaClient()
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

app.get('/module/getall',Services.GetallOfUser)//test Module exprots
app.get('/users', Services.GetUser)
app.get('/finduser/:id', Services.FindUser)
app.get('/post/:id', Services.FindPost)
app.get('/posts/', Services.GetAllPost)
app.get('/user/post/:id', Services.GetPostOfAuthorId)

app.post('/create/user', Services.CrateUser)
app.post('/post/create/:id', Services.CratePostByUserId)
app.post('/post/create/', Services.CratePost) //don't add post in user ID


app.put('/edit/user/:id', Services.EditUserById)
app.put('/edit/postId/:id', Services.EditPostById)
app.put('/edit/user/:authorId/post/:id', Services.EditPostByAuthorId)

app.delete('/delete/user/:id', Services.DeleteUser)
app.delete('/post/delete/:id',Services.DeletePostById)
app.delete('/deletePost/userId/:authorId/postId/:id',Services.DeletePostRefByAuthorId )

