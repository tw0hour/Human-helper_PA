import express from "express";
import {DeliveryController} from "../controllers/delivery.controller";

const deliveryRoutes = express();

/**
 * GetAll
 */
deliveryRoutes.get("/",async function(req,res){
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getAll();

    if(delivery) {
        res.status(201).end();
        res.json(delivery).end();
    }
});

/**
 * GetById
 */
deliveryRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getById(id);

    if(delivery) {
        res.status(201).end();
        res.json(delivery).end();
    }
});

/**
 * Add
 */
deliveryRoutes.post("/", async function(req, res) {
    const status = req.body.status;

    if(status === undefined) {
        res.status(400).end();
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.add({
        status
    });

    if(delivery) {
        res.status(201).end();
        res.json(delivery).end();
    }
});

/**
 * Upadte
 */
deliveryRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const status = req.params.staut;

    if(id === undefined || status === undefined) {
        res.status(400).end();
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.update({
        id,
        status
    });

    if(delivery) {
        res.status(201).end();
        res.json(delivery).end();
    }
});

/**
 * Delete
 */
deliveryRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === undefined) {
        res.status(400).end();
    }
    const deliveryController = await DeliveryController.getInstance();
    const deliveryDelete = await deliveryController.removeById(id);

    if(deliveryDelete) {
        res.status(201).end();
        res.json(deliveryDelete).end();
    }
});

export {
    deliveryRoutes
};
