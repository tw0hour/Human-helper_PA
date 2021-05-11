import express from "express";
import {Type_ClothController} from "../controllers/type_cloth.controller";
import {AssociationController} from "../controllers/association.controller";

const type_clothRoutes = express();

/**
 * GetAll
 */
type_clothRoutes.get("/",async function(req,res){
    const type_clothController = await Type_ClothController.getInstance();
    const type_cloth = await type_clothController.getAll();

    if(type_cloth){
        res.status(201).end();
        res.json(type_cloth).end();
    }
});

/**
 * GetById
 */
type_clothRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const type_clothController = await Type_ClothController.getInstance();
    const type_cloth = await type_clothController.getById(id);

    if(type_cloth) {
        res.json(type_cloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
type_clothRoutes.post("/", async function(req, res) {
    const type = req.body.type;

    if (type === undefined) {
        res.status(400).end();
        return;
    }
    const type_clothController = await Type_ClothController.getInstance();
    const type_cloth = await type_clothController.add({
        type
    });
    if(type_cloth) {
        res.status(201).end();
        res.json(type_cloth);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
type_clothRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const type = req.body.type;

    if (id === undefined || type === undefined) {
        res.status(400).end();
        return;
    }
    const type_clothController = await Type_ClothController.getInstance();
    const type_cloth = await type_clothController.update({
        id,
        type
    });

    if(type_cloth) {
        res.status(201).end();
        res.json(type_cloth);
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
type_clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const type_clothController = await Type_ClothController.getInstance();
    const type_cloth = await type_clothController.removeById(id);

    if(type_cloth) {
        res.status(201).end();
        res.json(type_cloth);
    } else {
        res.status(500).end();
    }
});

export {
    type_clothRoutes
};