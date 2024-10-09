const express=require('express');
const multer=require('multer');
const router=express.Router();
const path=require('path');
const blogRepo = require('../models/blog')
const commentRepo = require('../models/comments')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })

  const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    });
});

router.get('/:id',async(req,res)=>{
   const blog=await blogRepo.findById(req.params.id).populate('createdBy');
   const comments = await commentRepo.find({blogId:req.params.id}).populate('createdBy');
//    console.log(comments);
    return res.render('blog',{
        user:req.user,
        blog,
        comments
    })
})

router.post('/comment/:blogId',async(req,res)=>{
        await commentRepo.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}=req.body;
    const blog=await blogRepo.create({
        title,
        body,
        createdBy:req.user._id,
        coverImage:`/uploads/${req.file.filename}`
    });
   return res.redirect(`/blog/${blog._id}`)
});

module.exports=router;