import express from "express";
import {TypeClothController} from "../controllers/typeCloth.controller";

const typeClothRoutes = express();
const cors = require('cors');
typeClothRoutes.use(cors());
/**
 * GetAll
 */
typeClothRoutes.get("/",async function(req, res){
    const typeClothController = await TypeClothController.getInstance();
    const typeCloth = await typeClothController.getAll();

    if(typeCloth){
        res.json(typeCloth);
        res.status(201).end();
    }
});

/**
 * GetById
 */
typeClothRoutes.get("/:id",async function(req, res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const typeClothController = await TypeClothController.getInstance();
    const typeCloth = await typeClothController.getById(id);

    if(typeCloth) {
        res.json(typeCloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
typeClothRoutes.post("/", async function(req, res) {
    const type = req.body.type;

    if (type === undefined) {
        res.status(400).end();
        return;
    }
    const typeClothController = await TypeClothController.getInstance();
    const doublonTypeCloth = await typeClothController.checkDoublonTypeCloth(type);
    if(doublonTypeCloth) {
        res.status(400).end();
        return;
    }

    const typeCloth = await typeClothController.add({
        type
    });
    if(typeCloth) {
        res.json(typeCloth);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
typeClothRoutes.put("/:id",async function(req, res){
    const id = req.params.id;
    const type = req.body.type;

    if (id === undefined || type === undefined) {
        res.status(400).end();
        return;
    }
    const typeClothController = await TypeClothController.getInstance();
    const typeCloth = await typeClothController.update({
        id:parseInt(id),
        type
    });

    if(typeCloth) {
        res.json(typeCloth);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
typeClothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const typeClothController = await TypeClothController.getInstance();
    const typeCloth = await typeClothController.removeById(id);

    if(typeCloth) {
        res.json(typeCloth);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    typeClothRoutes
};
