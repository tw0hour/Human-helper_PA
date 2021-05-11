import express from "express";
import {GivenController} from "../controllers/given.controller";
import {AssociationController} from "../controllers/association.controller";

const givenRoutes = express();

/**
 * GetAll
 */
givenRoutes.get("/",async function(req,res){
    const givenController = await GivenController.getInstance();
    const given = await givenController.getAll();

    if(given){
        res.status(201).end();
        res.json(given).end();
    }
});

/**
 * GetById
 */
givenRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const givenController = await GivenController.getInstance();
    const given = await givenController.getById(id);

    if(given) {
        res.json(given);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
givenRoutes.post("/", async function(req, res) {
    const money = req.body.money;
    const date = req.body.date;

    if (money === undefined || date === undefined) {
        res.status(400).end();
        return;
    }
    const givenController = await GivenController.getInstance();
    const given = await givenController.add({
        money,
        date
    });
    if(given) {
        res.status(201).end();
        res.json(given);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
givenRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const money = req.body.money;
    const date = req.body.date;

    if (id === undefined || money === undefined || date === undefined) {
        res.status(400).end();
        return;
    }
    const givenController = await GivenController.getInstance();
    const given = await givenController.update({
        id,
        money,
        date
    });

    if(given) {
        res.status(201).end();
        res.json(given);
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
givenRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const givenController = await GivenController.getInstance();
    const given = await givenController.removeById(id);

    if(given) {
        res.status(201).end();
        res.json(given);
    } else {
        res.status(500).end();
    }
});

export {
    givenRoutes
};