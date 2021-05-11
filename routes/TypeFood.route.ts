import express from "express";
import {Type_FoodController} from "../controllers/TypeFood.controller";
import {AssociationController} from "../controllers/association.controller";

const typeFoodRoutes = express();

/**
 * GetAll
 */
typeFoodRoutes.get("/",async function(req,res){
    const type_foodController = await Type_FoodController.getInstance();
    const type_food = await type_foodController.getAll();

    if(type_food){
        res.status(201).end();
        res.json(type_food).end();
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
    const type_foodController = await Type_FoodController.getInstance();
    const type_food = await type_foodController.getById(id);

    if(type_food) {
        res.json(type_food);
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
    const type_foodController = await Type_FoodController.getInstance();
    const type_food = await type_foodController.add({
        type
    });
    if(type_food) {
        res.status(201).end();
        res.json(type_food);
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
    const type_foodController = await Type_FoodController.getInstance();
    const type_food = await type_foodController.update({
        id,
        type
    });

    if(type_food) {
        res.status(201).end();
        res.json(type_food);
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
    const type_foodController = await Type_FoodController.getInstance();
    const type_foodDelete = await type_foodController.removeById(id);

    if(type_foodDelete) {
        res.status(201).end();
        res.json(type_foodDelete);
    } else {
        res.status(500).end();
    }
});

export {
    typeFoodRoutes
};