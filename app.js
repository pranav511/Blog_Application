require('dotenv').config();
const express=require('express');
const PORT=process.env.PORT || 8000;
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes');
const cookieParser=require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const blogRepo = require('./models/blog')


// mongoose.connect(process.env.MONGO_URL)
// .then((e)=>console.log('mongdb connected '))

mongoose.connect('mongodb://localhost:27017/Blgify-Final')
.then((e)=>console.log('mongdb connected '))

//set view engine
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

//routing
app.get('/',async (req,res)=>{
    const allBlogs= await blogRepo.find({});
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
});

app.use('/users',userRoutes);
app.use('/blog',blogRoutes);

//run the server at 8000
app.listen(PORT,()=>{
    console.log(`server is live at ${PORT}`);
})