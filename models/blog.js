const {schema,model, Schema, default: mongoose}=require('mongoose');


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },coverImage:{
        type:String,
        required:false
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

const blogRepo=model('blog',blogSchema);

module.exports=blogRepo;