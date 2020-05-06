const express = require("express");

const Posts = require("./data/db.js");

const router = express.Router();


router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (!post[0]) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    
      } else {
         res.status(200).json(post);
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error:"The post information could not be retrieved."
      });
    });
});

router.get("/:id/comments", (req, res) => {
    Posts.findCommentById(req.params.id)
      .then(comment => {
        if (!comment[0]) {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
      
        } else {
            res.status(200).json({ data: comment});
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error:"The comments information could not be retrieved."
        });
      });
  });
  

router.post('/', (req, res) => {
   
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: "Please provide title and contents for the post."})
    } else {

        Posts.insert(req.body)
        .then(post => {
           
                res.status(201).json(post);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database"})
            })
    }
    })
  
    router.put("/:id", (req, res) => {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post."})
        } else {
         Posts.update(req.params.id, req.body)
          .then(post => {
            if (post) {
              res.status(200).json(post);
            } else {
              res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
          })
          .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
              error: "The post information could not be modified."
            });
          });
      }});
      
      
      

router.delete("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    
      } else {
     
         res.status(200).json(post);
        
      }
    })
    Posts.remove(req.params.id)
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          error: "The post could not be removed" 
        });
    
    });
});




module.exports = router;
