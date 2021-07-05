import express from "express";
import {DeliveryController} from "../controllers/delivery.controller";

const deliveryRoutes = express();
const cors = require('cors');
deliveryRoutes.use(cors());
/**
 * (pour le moment en variable global dans delivery.routes, a voir s'il est possible de le définir dans le model
 * pour le status :
 *      - en stock : stock
 *      - en cours de livraison : delivery
 *      - livré : delivered
 */
const inStockStatus = "stock"; // todo a voir si vraiment utile
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
    const status = req.body.status;

    if(status === undefined)
    {
        res.status(400).end();
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.add({
        status
    });

    if(delivery) {
        res.json(delivery);
        res.status(201).end();
    }
});

/**
 * Update
 */
deliveryRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const status = req.body.status;

    if(id === undefined || status === undefined) {
        res.status(400).end();
        return;
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.update({
        id:parseInt(id),
        status
    });

    if(delivery !==null) {
        res.json(delivery);
        res.status(201).end();
    }else{
        res.status(500).end();
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
