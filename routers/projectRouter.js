const express = require('express');

const Projects = require("../data/helpers/projectModel.js");

const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();




router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The projects could not be retrieved."
      });
    });
});


router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
     
         res.status(200).json(project);
      }
    )
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error:"The project could not be retrieved."
      });
    });
});

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
     
         res.status(200).json(actions);
      }
    )
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error:"The actions could not be retrieved."
      });
    });
});

router.post('/', (req, res) => {

    Projects.insert(req.body)
    .then(project => {
       
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the project to the database"})
        })
})

router.post('/:id/actions', validateProjectId, (req, res) => {

  const project = {...req.body, project_id: req.params.id};

  Actions.insert(project)
  .then(action => {
     
          res.status(201).json(action);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "There was an error while saving the action to the database"})
      })
});

router.put("/:id", (req, res) => {
    Projects.update(req.params.id, req.body)
     .then(project => {
         res.status(200).json(project);
       }
   )
    .catch(error => {
       // log error to database
       console.log(error);
       res.status(500).json({
         error: "The project could not be modified."
       });
     });
 });

 
router.delete("/:id", (req, res) => {

    Projects.remove(req.params.id)
  .then(project => {
    res.status(200).json(project);
  })
  .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The project could not be removed" 
      });
  
  });
});




function validateProjectId(req, res, next) {
 
    Projects.get(req.params.id)
      .then(project => {
        if (!project) {
          res.status(404).json({ message:"invalid project id"});
      
        } else {
           req.project = project;
           next();
        }
      })
  }
  

module.exports = router;
