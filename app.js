// // const express=require("express");
// import express from 'express';
// const app=express();
// const port=5000;

// //static files
// app.use(express.static('public'))

// app.use('/css',express.static(__dirname +'public/css'))
// app.use('/img',express.static(__dirname +'public/img'))
// app.use('/js',express.static(__dirname +'public/js'))

// //templating engine
// app.set('views','./src/views')
// app.set('view engine','ejs')

// //routes
// const blogRouter=require('./scr/routes/blog')
// app.use('/',blogRouter)

// app.listen(port,()=>console.log("listening to port "+port));
import express from 'express'
import bodyParser from "body-parser"
import ejs from "ejs"
import _ from "lodash"
import {application} from "express"
import mongoose from "mongoose"

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.locals._ = _

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://efecollins-admin:admin-efecollins-4311404114@cluster0.unuhgl6.mongodb.net/blogDB", {useNewUrlParser: true});


const postSchema = {
  postTitle: String,
  postBody: String
}

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts})
  })
})

app.get("/about", (req, res) => {
  res.render('about', {aboutContent: aboutContent})
})

app.get("/contact", (req, res) => {
  res.render('contact', {contactContent: contactContent})
})

app.get("/compose", (req, res) => {
  res.render('compose')
})

app.post("/compose", (req, res) => {
  //{postTitle: req.body.postTitle, postBody: req.body.postBody}
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  })
  post.save(err => {
    if(!err) {
      res.redirect("/");
    }
  });
})

app.get("/posts/:postId", (req, res) => {
  const requestedId = _.toString(req.params.postId);
  Post.findOne({_id: requestedId}, (err, post) => {
    res.render('post', {postTitle: post.postTitle, postBody: post.postBody})
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

