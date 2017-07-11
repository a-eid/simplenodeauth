import express from 'express' 
import Router from './router' 
const app = express() 

app.set('view engine' , 'pug')

app.use(Router)

app.listen(3000)
