import express from 'express'
const Router = express.Router()
import {
  home, register, login, logout, secret,
  create, authenticate, loggedinForbidden, loggedinRequired
} from './controller'


// serving pages 
Router.get('/', home)
Router.get('/register', loggedinForbidden, register)
Router.get('/login', loggedinForbidden, login)
Router.get('/secret', loggedinRequired, secret)
Router.get('/logout', logout)

Router.post('/register', create)
Router.post('/login', authenticate)

export default Router