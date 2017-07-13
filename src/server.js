import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import csrf from 'csurf'


const MongoStore = mongoStore(session);
import Router from './router'
const app = express()

app.locals.pretty = true

app.use(session({
  secret: 'long randomly generated string asdlfjkas;dlfk',
  name: 'ssId',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true , 
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 15
  }
}))


mongoose.connect('mongodb://localhost/auth');
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use(cookieParser())
app.use(csrf({cookie: true }))
app.use(Router)

// app.get('/auth' , (req ,res) => {
//   req.session.loggedin = true 
//   res.redirect('/loggedin')
// })

// app.get('/loggedin' , (req, res) => {
//   res.json({
//     loggedin: req.session.loggedin ? "yes" : "no"
//   })
// })


app.listen(3000, () => console.log('server running , http://localhost:3000 '))
