import mongoose from 'mongoose' 

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId, 
  email: {
    type: String , 
    required: [true , "email is required"] ,
    unique: true 
  } , 
  password:{
    type: String , 
    required: [true ,  "password is required"] 
  } ,
})


export default mongoose.model('User' , userSchema)


