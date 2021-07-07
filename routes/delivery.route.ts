import express from "express";
import {DeliveryController} from "../controllers/delivery.controller";

const deliveryRoutes = express();
const cors = require('cors');
deliveryRoutes.use(cors());
/**
 * pour le status :
 *      - en cours de livraison : delivery
 *      - livré : delivered
 */
const deliveryStatus = "delivery";
const deliveredStatus = "delivered";

/**
 * GetAll
 */
deliveryRoutes.get("/",async function(req,res){
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getAll();

    if(delivery)
    {
        res.json(delivery);
        res.status(201).end();
    }
    else
    {
        res.status(404).end();
        return;
    }
});

/**
 * get by delivery
 */
deliveryRoutes.get("/delivery",async function(req,res){
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getAllByStatus(deliveryStatus);

    if(delivery)
    {
        res.json(delivery);
        res.status(201).end();
    }
    else
    {
        res.status(404).end();
        return;
    }
});

deliveryRoutes.get("/delivered",async function(req,res){
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getAllByStatus(deliveredStatus);

    if(delivery)
    {
        res.json(delivery);
        res.status(201).end();
    }
    else
    {
        res.status(404).end();
        return;
    }
});

/**
 * GetById
 */
deliveryRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined)
    {
        res.status(400).end();
    }

    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getById(id);

    if(delivery)
    {
        res.json(delivery);
        res.status(201).end();
    }
    else
    {
        res.status(404).end();
    }
});

/**
 * Add
 */
deliveryRoutes.post("/", async function(req, res) {

    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.add({
        status:deliveryStatus
    });

    if(delivery) {
        res.json(delivery);
        res.status(201).end();
    }
});

/**
 * set status delivered
 */
deliveryRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    if(id === undefined) {
        res.status(400).end();
        return;
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getById(id);
    if(delivery === null){
        res.status(404).end();
        return;
    }else{
        const deliveryUpdate = await deliveryController.update({
            id:parseInt(id),
            status:deliveredStatus
        });

        if(deliveryUpdate !==null) {
            res.json(deliveryUpdate);
            res.status(201).end();
        }else{
            res.status(500).end();
        }
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
        res.json(deliveryDelete);
        res.status(201).end();
    }
});

export {
    deliveryRoutes
};
