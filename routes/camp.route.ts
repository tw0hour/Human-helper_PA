import express from "express";
import {AssociationController} from "../controllers/association.controller";
import {CampController} from "../controllers/camp.controller";

const campRoutes = express();


/**
 * GetAll
 */
campRoutes.get("/",async function(req,res){
    const campController = await CampController.getInstance();
    const camp = await campController.getAll();

    if(camp){
        res.status(201).end();
        res.json(camp).end();
    }
});
/**
 * GetById
 */
campRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const campController = await CampController.getInstance();
    const camp = await campController.getAll();

    if(camp) {
        res.json(camp);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
campRoutes.post("/", async function(req, res) {
    const nb_people = req.body.nb_people;
    const city = req.body.city;
    const address = req.body.adress;
    const postal_code = req.body.postal_code;

    if(nb_people === undefined || city === undefined || address === undefined || postal_code === undefined) {
        res.status(400).end();
        return;
    }
    const campController = await CampController.getInstance();
    const camp = await campController.add({
        nb_people,
        city,
        address,
        postal_code
    });

    if(camp) {
        res.json(camp);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Update
 */
campRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const nb_people = req.body.nb_people;
    const city = req.body.city;
    const address = req.body.adress;
    const postal_code = req.body.postal_code;

    if(id === undefined || nb_people === undefined || city === undefined || address === undefined || postal_code === undefined) {
        res.status(400).end();
        return;
    }
    const campController = await CampController.getInstance();
    const camp = await campController.update({
        id,
        nb_people,
        city,
        address,
        postal_code
    });

    if(camp) {
        res.json(camp);
        res.status(201).end();
    } else {
        res.status(404).end();
    }


});

/**
 * Delete
 */
campRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const campController = await CampController.getInstance();
    const camp = await campController.removeById(id);

    if(camp) {
        res.status(201).end();
        res.json(camp);
    } else {
        res.status(500).end();
    }
});

export {
    campRoutes
};