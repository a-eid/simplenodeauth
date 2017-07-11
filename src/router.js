import express from 'express'
const Router = express.Router()


Router.get('/', (req, res) => {
  res.render('index')
})

Router.get('/register', (req, res) => {
  res.render('register')
})

Router.get('/login', (req, res) => {
  res.render('login')
})

Router.get('/secret', (req, res) => {
  res.render('secret')
})

Router.get('/logout', (req, res) => {
  // todo log out
  res.redirect('/')
})



export default Router