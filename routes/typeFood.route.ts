import express from "express";
import {TypeFoodController} from "../controllers/typeFood.controller";

const typeFoodRoutes = express();

/**
 * GetAll
 */
typeFoodRoutes.get("/",async function(req,res){
    const typeFoodController = await TypeFoodController.getInstance();
    const typeFood = await typeFoodController.getAll();

    if(typeFood){
        res.json(typeFood);
        res.status(201).end();
    }
});

/**
 * GetById
 */
typeFoodRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const typeFoodController = await TypeFoodController.getInstance();
    const typeFood = await typeFoodController.getById(id);

    if(typeFood) {
        res.json(typeFood);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
typeFoodRoutes.post("/", async function(req, res) {
    const type = req.body.type;

    if (type === undefined) {
        res.status(400).end();
        return;
    }
    const typeFoodController = await TypeFoodController.getInstance();
    const doublonTypeFood = await typeFoodController.checkDoublonTypeFood(type);
    if(doublonTypeFood) {
        res.status(400).end();
        return;
    }
    const typeFood = await typeFoodController.add({
        type
    });
    if(typeFood) {
        res.json(typeFood);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
typeFoodRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const type = req.body.type;

    if (type === undefined) {
        res.status(400).end();
        return;
    }
    const typeFoodController = await TypeFoodController.getInstance();
    const typeFood = await typeFoodController.update({
        id,
        type
    });

    if(typeFood) {
        res.json(typeFood);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
typeFoodRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const typeFoodController = await TypeFoodController.getInstance();
    const typeFoodDelete = await typeFoodController.removeById(id);

    if(typeFoodDelete) {
        res.json(typeFoodDelete);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    typeFoodRoutes
};
