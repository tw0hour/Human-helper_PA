 import express from "express";
 import {AssociationController} from "../controllers/association.controller";
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
  * GetByName
  */
 associationRoutes.get("/name/:name", async function(req,res){
     const name = req.params.name;
     if(name === undefined) {
         res.status(400).end();
     }
     const associationController = await AssociationController.getInstance();
     const association = await associationController.getByName(name);

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


     if (id === undefined ) {
         res.status(400).end();
         return;
     }
     const associationController = await AssociationController.getInstance();
     const association = await associationController.getById(id);
     if(association === null){
         res.status(404).end();
         return
     }

     const name = req.body.name === undefined ? req.body.name : association.name;
     const mail = req.body.mail === undefined ? req.body.mail : association.mail;
     const password = req.body.password === undefined ? req.body.password : association.password;
     const money = req.body.money === undefined ? req.body.money : association.money;

     const associationUpdate = await associationController.update({
         id:parseInt(id),
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

 /**
  * Get the name of the table which has the least stock
  */
associationRoutes.get("/needs/:idAssoc", async function (req,res){
    const idAssoc = req.params.idAssoc;
    if (idAssoc === undefined) {
        res.status(400).end();
        return;
    }

    const associationController = await AssociationController.getInstance();
    const needsAssociation = await associationController.needs(idAssoc);

    if(needsAssociation === null){
        res.status(500).end();
    } else {
        res.json(needsAssociation);
        res.status(201).end();
    }
});



export {
    associationRoutes
};
