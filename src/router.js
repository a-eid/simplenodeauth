import express from 'express'
const Router = express.Router()
import {
  home, register, login, logout, secret,
  create, authenticate
} from './controller'


// serving pages 
Router.get('/', home)
Router.get('/register', register)
Router.get('/login', login)
Router.get('/secret', secret)
Router.get('/logout', logout)

Router.post('/register', create)
Router.post('/login', authenticate)

export default Router