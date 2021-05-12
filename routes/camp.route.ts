import express from "express";
import {CampController} from "../controllers/camp.controller";

const campRoutes = express();


/**
 * GetAll
 */
campRoutes.get("/",async function(req,res){
    const campController = await CampController.getInstance();
    const camp = await campController.getAll();

    if(camp){
        res.json(camp);
        res.status(201).end();
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
    const nbPeople = req.body.nbPeople;
    const city = req.body.city;
    const address = req.body.address;
    const postalCode = req.body.postalCode;

    if(nbPeople === undefined || city === undefined || address === undefined || postalCode === undefined) {
        res.status(400).end();
        return;
    }
    const campController = await CampController.getInstance();
    const camp = await campController.add({
        nbPeople,
        city,
        address,
        postalCode
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
    const nbPeople = req.body.nbPeople;
    const city = req.body.city;
    const address = req.body.address;
    const postalCode = req.body.postalCode;

    if(id === undefined || nbPeople === undefined || city === undefined || address === undefined || postalCode === undefined) {
        res.status(400).end();
        return;
    }
    const campController = await CampController.getInstance();
    const camp = await campController.update({
        id,
        nbPeople,
        city,
        address,
        postalCode
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
        res.json(camp);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    campRoutes
};
