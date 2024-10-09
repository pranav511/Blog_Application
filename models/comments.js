const {schema,model, Schema, default: mongoose}=require('mongoose');
const blogSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:'blog'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})


const commentRepo=model('comment',blogSchema);

module.exports=commentRepo;