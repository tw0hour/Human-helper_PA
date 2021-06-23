 import express from "express";
 import {AssociationController} from "../controllers/association.controller";
 import {VolunteerController} from "../controllers/volunteer.controller";
 import {volunteerRoutes} from "./volunteer.route";
const associationRoutes = express();

 const cors = require('cors');
 associationRoutes.use(cors());

 /**
  * GetAll
  */
 associationRoutes.get("/", async function(req,res){
    const associationController = await AssociationController.getInstance();
    const association = await associationController.getAll();

    if(association){
        res.json(association);
        res.status(201).end();
    }
});

 /**
  * GetById
  */
 associationRoutes.get("/:id", async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(id);

    if(association) {
        res.json(association);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

 /**
  * Add
  */
 associationRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const money = req.body.money;

    if (name === undefined || mail === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    const associationController = await AssociationController.getInstance();
    const association = await associationController.add({
        name,
        mail,
        password,
        money
    });
    if(association) {
        res.json(association);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

 /**
  * Connexion
  * @param  name, password
  */
 volunteerRoutes.post("/connection",async function (req, res){
     const name = req.body.name;
     const password = req.body.password;
     if(name === undefined || password === undefined){
         res.status(400).end();
     }
     const associationController = await AssociationController.getInstance();
     const association = await associationController.connection(name, password);

     if(!association){
         console.log("Connexion refusée !");
         res.status(404).end();
         return;
     }else{
         console.log("Connexion réussie ! ")
         res.json(association);
         res.status(204).end();
     }
 });

 /**
  * Update
  */
 associationRoutes.put("/:id",async function(req,res){
     const id = req.params.id;
     const name = req.body.name;
     const mail = req.body.mail;
     const password = req.body.password;
     const money = req.body.money;

     if (id === undefined || name === undefined || mail === undefined || password === undefined) {
         res.status(400).end();
         return;
     }
     const associationController = await AssociationController.getInstance();
     const associationUpdate = await associationController.update({
         id,
         name,
         mail,
         password,
         money
     });

     if(associationUpdate) {
         res.json(associationUpdate);
         res.status(201).end();

     } else {
         res.status(500).end();
     }
});

associationRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const associationController = await AssociationController.getInstance();
    const associationDelete = await associationController.removeById(id);

    if(associationDelete) {
        res.json(associationDelete);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    associationRoutes
};
