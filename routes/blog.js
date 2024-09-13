const express=require('express')
const blogRouter=express.Router()

blogRouter.get('',async(req,res)=>{
    res.render('blog')
})
module.exports=blogRouterRouter