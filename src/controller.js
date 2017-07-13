import User from './userModel'
import { getMongooseErrors } from './helper'

export const home = (req, res) => {
  res.render('index')
}

export const register = (req, res) => {
  if (notLoggedin(req))
    return res.render('register')
  res.redirect('/secret')
}

export const login = (req, res) => {
  if (notLoggedin(req))
    return res.render('login')
  res.redirect('/secret')
}

export const logout = (req, res) => {
  req.session && req.session.destroy()
  res.redirect('/')
}

export const secret = (req, res) => {
  if (notLoggedin(req))
    return res.redirect('/login')
  res.render('secret' , {
    user : req.session.user 
  })
}

export const create = async (req, res) => {
  try {
    let user = new User(req.body)
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
    if (!user || user.password !== req.body.password)
      return res.render('login', ["invalid credintials"])
    req.session.user = user
    res.redirect('/secret')
  } catch (e) {
    res.send("ERROR: SERVER ERROR")
  }
}

const isLoggedin = req => req.session && req.session.user
const notLoggedin = req => !req.session || !req.session.user 
