import bcrypt from 'bcryptjs'

import User from './userModel'
import { getMongooseErrors } from './helper'
var salt = bcrypt.genSaltSync(10);

export const home = (req, res) => {
  res.render('index')
}

export const register = (req, res) => {
   res.render('register')
}

export const login = (req, res) => {
   res.render('login')
}

export const logout = (req, res) => {
  req.session && req.session.destroy()
  res.redirect('/')
}

export const secret = (req, res) => {
   res.render('secret')
}

export const create = async (req, res) => {
  try {
    let user = new User(Object.assign(req.body, { password: bcrypt.hashSync(req.body.password) }))
    await user.save()
    req.session.user = JSON.stringify(user)
    req.loggedin = true
    console.log(req.loggedin)
    console.log(req.session.user)
    res.redirect('/secret')
  } catch (e) {
    res.render('register', {
      errors: e.code == 11000 ? ["user with email address already exists"] : getMongooseErrors(e)
    })
  }
}

export const authenticate = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user || !bcrypt.compareSync(req.body.password, user.password))
      return res.render('login', ["invalid credintials"])
    req.session.user = user
    res.redirect('/secret')
  } catch (e) {
    console.log(e)
    res.send("ERROR: SERVER ERROR")
  }
}

export const loggedinRequired = (req, res, next) => {
  if (req.session && req.session.user){
    res.locals.user = req.session.user
    next() 
  }else{
    res.redirect('/login')
  }
}

export const loggedinForbidden = (req , res, next) => {
  if (!req.session || !req.session.user) {
    req.session && req.session.destroy()
    next()
  }else{
   res.redirect('/secret')
  }
}