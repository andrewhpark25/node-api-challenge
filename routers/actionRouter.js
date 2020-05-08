const express = require('express');

const Actions = require("../data/helpers/actionModel.js");



const router = express.Router();



router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The actions could not be retrieved."
      });
    });
});


router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
     
         res.status(200).json(action);
      }
    )
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error:"The action could not be retrieved."
      });
    });
});

router.put("/:id", (req, res) => {
    Actions.update(req.params.id, req.body)
     .then(action => {
         res.status(200).json(action);
       }
   )
    .catch(error => {
       // log error to database
       console.log(error);
       res.status(500).json({
         error: "The action could not be modified."
       });
     });
 });
 
 

router.delete("/:id", (req, res) => {
    
    Actions.remove(req.params.id)
  .then(action => {
    res.status(200).json(action);
  })
  .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The action could not be removed" 
      });
  
  });
});







module.exports = router;
