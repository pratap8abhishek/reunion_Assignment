const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName:{
    type:String,
    default: null
   },
   lastName:{
    type:String,
    default:null
   },
   email:{
    type:String,
    unique:true
   },
   password:{
    type:String
   },
   token:{
    type:String
   },
   post:{
      type: String,
   },
   title:{
      type: String
   },
   description:{
    type:String
   },
   follow:{
      type: Number,
      default: null 
   },
   unfollow:{
    type: Number,
    default: null
   },
   like:{
     type: Number,
     default: null
   },
   unlike:{
     type: Number,
     default: null
   },
   comment:{
     type: String
   }
});
module.export = mongoose.model("user",userSchema);