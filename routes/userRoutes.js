const express=require('express');
const router=express.Router();
const User=require('../models/user')

router.get('/signup',(req,res)=>{
    return res.render('signup');
})
router.get('/signin',(req,res)=>{
    return res.render('signin');
})
router.post('/signup',async(req,res)=>{
    const {fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.render('signin')
})

router.post('/signin',async(req,res)=>{
    try {
    const {email,password}=req.body;
    const token= await User.matchPasswordAndGenerateToken(email,password);
    //console.log("Token",token);
    return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:'Incorrect email & password!...'
        })
    }

})

router.get('/logout',(req,res)=>{
    return res.clearCookie('token').redirect('/');
})


module.exports=router;
