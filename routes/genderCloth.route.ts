import express from "express";
import {GenderClothController} from "../controllers/genderCloth.controller";

const genderClothRoutes = express();

/**
 * GetAll
 */
genderClothRoutes.get("/",async function(req, res){
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.getAll();

    if(genderCloth){
        res.status(201).end();
        res.json(genderCloth).end();
    }
});

/**
 * GetById
 */
genderClothRoutes.get("/:id",async function(req, res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.getById(id);

    if(genderCloth) {
        res.json(genderCloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
genderClothRoutes.post("/", async function(req, res) {
    const type = await req.body.type;

    if (type === undefined) {
        res.status(400).end();
        return;
    }
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.add({
        type
    });
    if(genderCloth) {
        res.status(201).end();
        res.json(genderCloth);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
genderClothRoutes.put("/:id",async function(req, res){
    const id = req.params.id;
    const type = req.body.type;

    if (id === undefined || type === undefined) {
        res.status(400).end();
        return;
    }
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.update({
        id,
        type
    });

    if(genderCloth) {
        res.status(201).end();
        res.json(genderCloth);
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
genderClothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.removeById(id);

    if(genderCloth) {
        res.status(201).end();
        res.json(genderCloth);
    } else {
        res.status(500).end();
    }
});

export {
    genderClothRoutes
};
