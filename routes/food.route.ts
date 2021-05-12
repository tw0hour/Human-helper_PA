import express from "express";
import {FoodController} from "../controllers/food.controller";

const foodRoutes = express();

/**
 * GetAll
 */
foodRoutes.get("/",async function(req,res){
    const foodController = await FoodController.getInstance();
    const food = await foodController.getAll();

    if(food){
        res.json(food);
        res.status(201).end();
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
    const name = req.body.name;
    const typeFoods = req.body.typeFoods;
    const expirationDate = req.body.expirationDate;

    if(name === undefined || typeFoods === undefined || expirationDate === undefined) {
        res.status(400).end();
        return;
    }

    const foodController = await FoodController.getInstance();
    const food = await foodController.add({
        name,
        typeFoods,
        expirationDate
    });

    if(food) {
        res.json(food);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
foodRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const name = req.body.name;
    const typeFoods = req.body.typeFoods;
    const expirationDate = req.body.expirationDate;

    if(id === undefined || name === undefined || typeFoods === undefined || expirationDate === undefined) {
        res.status(400).end();
        return;
    }

    const foodController = await FoodController.getInstance();
    const food = await foodController.update({
        id,
        name,
        typeFoods,
        expirationDate
    });

    if(food) {
        res.json(food);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
foodRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const foodController = await FoodController.getInstance();
    const foodDelete = await foodController.removeById(id);

    if(foodDelete) {
        res.json(foodDelete);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    foodRoutes
};
