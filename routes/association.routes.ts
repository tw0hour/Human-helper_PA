 import express from "express";
 import {AssociationController} from "../controllers/association.controller";

const associationRoutes = express();

 /**
  * GetAll
  */
 associationRoutes.get("/", async function(req,res){
    const associationController = await AssociationController.getInstance();
    const association = await associationController.getAll();

    if(association){
        res.status(201).end();
        res.json(association).end();
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
        res.status(201).end();
        res.json(association);
    } else {
        res.status(500).end();
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
         res.status(201).end();
         res.json(associationUpdate);
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
        res.status(201).end();
        res.json(associationDelete);
    } else {
        res.status(500).end();
    }
});

export {
    associationRoutes
};