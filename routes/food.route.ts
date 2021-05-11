import express from "express";
import {FoodController} from "../controllers/Food.controller";
import {AssociationController} from "../controllers/association.controller";

const foodRoutes = express();

/**
 * GetAll
 */
foodRoutes.get("/",async function(req,res){
    const foodController = await FoodController.getInstance();
    const food = await foodController.getAll();

    if(food){
        res.status(201).end();
        res.json(food).end();
    }
});

/**
 * GetById
 */
foodRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const foodController = await FoodController.getInstance();
    const food = await foodController.getById(id);

    if(food) {
        res.json(food);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
foodRoutes.post("/", async function(req, res) {
    const name = await req.body.name;
    const type_food = await req.body.type_food;
    const expirationDate = await req.body.expirationDate;

    if(name === undefined || type_food === undefined || expirationDate === undefined) {
        res.status(400).end();
        return;
    }

    const foodController = await FoodController.getInstance();
    const food = await foodController.add({
        name,
        type_food,
        expirationDate
    });

    if(food) {
        res.status(201).end();
        res.json(food);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
foodRoutes.put("/:id",async function(req,res){
    const id = await req.params.id;
    const name = await req.body.name;
    const type_food = await req.body.type_food;
    const expirationDate = await req.body.expirationDate;

    if(id === undefined || name === undefined || type_food === undefined || expirationDate === undefined) {
        res.status(400).end();
        return;
    }

    const foodController = await FoodController.getInstance();
    const food = await foodController.update({
        id,
        name,
        type_food,
        expirationDate
    });

    if(food) {
        res.status(201).end();
        res.json(food);
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
foodRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = await req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const foodController = await FoodController.getInstance();
    const foodDelete = await foodController.removeById(id);

    if(foodDelete) {
        res.status(201).end();
        res.json(foodDelete);
    } else {
        res.status(500).end();
    }
});

export {
    foodRoutes
};