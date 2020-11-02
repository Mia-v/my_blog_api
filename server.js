const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sha256 = require('sha256');
require('dotenv').config();
require('./mongoose');


const Post = require('./mongoPostSchema');

const app = express();

const port = 8000;
app.listen(port, () => {
  console.log("Localhost:" + port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const PASSWORD = process.env.PASSWORD;
const authMiddleWare = (req, res, next) => {
  const { password } = req.body;
  if (sha256(password) === PASSWORD) {
    next;
  } else {
    res.send(
      {
        staus: 'error',
        message: 'Password is not correct.',
      }
    )
  }
}

app.use('/posts/new', authMiddleWare);

app.get('/posts', (_, res) => {
  Post.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/posts/:id", (req, res) => { 
  const { id } = req.params; 
 

  Post.findOne({ postId : id }, (err, post) => {
    if(err){
      res.send({"error" : "An error has occured"})
    }else{
      res.send(post);
    }
  });
});

  app.post('/posts', (req, res) => { 
    const { title, tags, textContent } = req.body;
    //const lastPost = posts.length - 1;

      if (!title || !textContent) {
        return res.status(400).send({
          status: 'error',
          message: 'Title or text is empty!',
        });
      }
    let newPost = new Post(req.body);

    newPost.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
  });
});