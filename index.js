const express = require('express');
const app = express();
app.use(express.json());
const User = require('./Schema/UserSchema');
const Details = require('./Schema/CategorySchema')
var cors = require('cors');
const bcrypt = require('bcryptjs');
const secretKey = 'iamasecretKey';
const JWT = require('jsonwebtoken');
const PORT = 3000;
const connectToMongo = require('./Db');
connectToMongo();
app.use(cors());



app.post('/register', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        let user = await User.findOne({email: email});
        if(user){
        return res.json({message: "Email address already exists"})
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        
        const payload = {
            userId: user._id
        }
        
        const authToken = JWT.sign(payload, secretKey);
        res.status(201).json({authToken})
    }catch(error){
        res.json({message: "Internal Error occured"})
    }


})



app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({message: 'Invalid credentials'})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
        return res.json({message: "Inavlid credentials"})
        }
        
        const payload = {
            userId: user._id
        }
        
        const authToken = JWT.sign(payload, secretKey);
        res.status(201).json({authToken})
    }catch(error){
        res.json({message: "Internal Error occurred"})
    }

})




app.get('/getallblogs', async (req, res) => {
    try{
        const allBlogs = await Details.find();
        res.status.json({allBlogs})
    }catch(error){
        res.json({message: "Internal error occured"})
    }

})



app.get('/getBlogsById/:id', async (req, res) => {
    try{
        const Blogs = await Details.findById(req.params.id);
        if(!Blogs){
            return res.json({message: "There are no Blogs"})
        }
        res.json(Blogs)
    }catch(error){
        res.json({message: "Internal error occured"})
    }
    
})


app.post('/createBlogs', async (req, res) => {
    try{
        const {title, description, blog_category, status, slug} = req.body
        const newBlogs = await Details.create({
            title: title,
            description: description,
            blog_category: blog_category,
            status: status,
            slug: slug
        });
        
        res.status(201).send(newBlogs)
    }catch(error){
        res.json({message: "Internal error occured"})
    }


})


app.put('/updateBlogs/:id', async (req, res) => {
    try{
        const updatedBlogs = await Details.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status
        }, {
            new: true,
        });
        
        if(!updatedBlogs){
            return res.send("There are no Blogs")
        }
        
        res.status(200).json(updatedBlogs)
    }catch(error){
        res.json({message: "Internal error occured"})
    }


})


app.delete('/deleteBlogs/:id', async (req, res) => {
    try{
        const deleteBlogs = await Details.findByIdAndDelete(req.params.id);
        res.end()
    }catch(error){
        res.json({message: "Internal error occured"})
    }
   
})












app.listen(PORT, () => {
console.log(`App is listening at the port ${PORT}`)
})
