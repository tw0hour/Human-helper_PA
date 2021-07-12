import express from "express";
import {FoodController} from "../controllers/food.controller";
import { TypeFoodController } from "../controllers/typeFood.controller";
import { VolunteerController } from "../controllers/volunteer.controller";
import {AssociationController} from "../controllers/association.controller";
import {DeliveryController} from "../controllers/delivery.controller";

const foodRoutes = express();
const cors = require('cors');
foodRoutes.use(cors());
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
 * get all  food in stock
 */
foodRoutes.get("/inStock",async function(req,res){
    const foodController = await FoodController.getInstance();
    const food = await foodController.getAllInStock();

    if(food) {
        res.json(food);
        res.status(201).end();
    }else{
        res.status(500).end();
    }
});

/**
 * get all by delivery_id
 */
foodRoutes.get("/delivery/:delivery_id",async function(req,res){
    const delivery_id = req.params.delivery_id;
    if(delivery_id === undefined){
        res.status(400).end();
        return;
    }

    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getById(delivery_id);
    if(delivery === null){
        res.status(404).end();
        return;
    }else{
        const foodController = await FoodController.getInstance();
        const food = await foodController.getAllDelivery(parseInt(delivery_id));

        if(food === null ) {
            res.status(500).end();
        }else{
            res.json(food);
            res.status(201).end();
        }
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
 * AddByVolunteer
 */
foodRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const expirationDate = req.body.expirationDate;
    const volunteer_id = req.body.volunteer_id;
    const type_food_id = req.body.type_food_id;
    const association_id = req.body.association_id;

    if(name === undefined ||  expirationDate === undefined || type_food_id === undefined) {
        res.status(400).end();
        return;
    }


    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getById(volunteer_id);
    if (volunteer === null) {
        res.status(404).end();
        return;
    }

    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(association_id);
    if (association === null) {
        res.status(404).end();
        return;
    }


    const typeFoodController = await TypeFoodController.getInstance();
    const typeFood = await typeFoodController.getById(type_food_id);

    if(typeFood !== null) {
        const foodController = await FoodController.getInstance();
        const food = await foodController.add({
            name,
            expirationDate,
            volunteer_id,
            type_food_id,
            association_id,
            delivery_id: null
        });

        if (food) {
            res.json(food);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }else{
        res.status(404).end();
        return;
    }
});

/**
 * AddByAssoc
 */
foodRoutes.post("/association/", async function(req, res) {
    const name = req.body.name;
    const expirationDate = req.body.expirationDate;
    const type_food_id = req.body.type_food_id;
    const association_id = req.body.association_id;

    if(name === undefined ||  expirationDate === undefined || type_food_id === undefined) {
        res.status(400).end();
        return;
    }

    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(association_id);
    if (association === null) {
        res.status(404).end();
        return;
    }


    const typeFoodController = await TypeFoodController.getInstance();
    const typeFood = await typeFoodController.getById(type_food_id);

    if(typeFood !== null) {
        const foodController = await FoodController.getInstance();
        const food = await foodController.add({
            name,
            expirationDate,
            volunteer_id: null,
            type_food_id,
            association_id,
            delivery_id: null
        });

        if (food) {
            res.json(food);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }else{
        res.status(404).end();
        return;
    }
});

/**
 * Update
 */
foodRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    if(id === undefined ) {
        res.status(400).end();
        return;
    }
    let type_food_id;
    if(req.body.type_food_id !== undefined){
        type_food_id = req.body.type_food_id;
        const typeFoodController = await TypeFoodController.getInstance();
        const typeFood = typeFoodController.getById(type_food_id);
        if(typeFood === null){
            res.status(404).end();
            return;
        }
    }

        const foodController = await FoodController.getInstance();
    const food = await foodController.getById(id);
    if (food === null){
        res.status(404).end();
        return;
    }else{
        let delivery_id;
        if(req.body.delivery_id !== undefined){
            delivery_id = req.body.delivery_id;
            const deliveryController = await DeliveryController.getInstance();
            const delivery = await deliveryController.getById(delivery_id);
            if (delivery === null){
                res.status(404).end();
                return;
            }
        }
        const name = req.body.name || food.name;
        const type_food_id = req.body.type_food_id || food.type_food_id;
        const expirationDate = req.body.expirationDate || food.expirationDate;

        const foodUpdate = await foodController.update({
            id:parseInt(id),
            name,
            type_food_id,
            expirationDate,
            delivery_id
        });

        if(foodUpdate) {
            res.json(foodUpdate);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
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
    const food = await foodController.getById(id);

    if(food!==null){
        const foodDelete = await foodController.removeById(id);
        if(foodDelete) {
            res.json(foodDelete);
            res.status(201).end();
        }else{
            res.status(500).end();
            return;
        }
    }
    else {
        res.status(404).end();
        return;
    }
});

export {
    foodRoutes
};
