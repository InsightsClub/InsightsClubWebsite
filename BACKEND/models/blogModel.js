//I write only the boiler plate of this ,not the actual code


const mongoose = require("mongoose");

const {Schema}=mongoose;

const blogSchema=new Schema({
   
    title:{
        type:String,
        require:true,
        
    },

   description:{
        type:String,
        require:true,
        
    },


    date:{
        type:Date,
        default:Date.now
    }

})

const Blog=mongoose.model("blog",blogSchema)
module.exports=Blog
