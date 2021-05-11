import express from "express";
import {GenderClothController} from "../controllers/genderCloth.controller";

const gender_clothRoutes = express();

/**
 * GetAll
 */
gender_clothRoutes.get("/",async function(req,res){
    const gender_clothController = await GenderClothController.getInstance();
    const gender_cloth = await gender_clothController.getAll();

    if(gender_cloth){
        res.status(201).end();
        res.json(gender_cloth).end();
    }
});

/**
 * GetById
 */
gender_clothRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const gender_clothController = await GenderClothController.getInstance();
    const gender_cloth = await gender_clothController.getById(id);

    if(gender_cloth) {
        res.json(gender_cloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
gender_clothRoutes.post("/", async function(req, res) {
    const type = await req.body.type;

    if (type === undefined) {
        res.status(400).end();
        return;
    }
    const gender_clothController = await GenderClothController.getInstance();
    const gender_cloth = await gender_clothController.add({
        type
    });
    if(gender_cloth) {
        res.status(201).end();
        res.json(gender_cloth);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
gender_clothRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const type = req.body.type;

    if (id === undefined || type === undefined) {
        res.status(400).end();
        return;
    }
    const gender_clothController = await GenderClothController.getInstance();
    const gender_cloth = await gender_clothController.update({
        id,
        type
    });

    if(gender_cloth) {
        res.status(201).end();
        res.json(gender_cloth);
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
gender_clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const gender_clothController = await GenderClothController.getInstance();
    const gender_cloth = await gender_clothController.removeById(id);

    if(gender_cloth) {
        res.status(201).end();
        res.json(gender_cloth);
    } else {
        res.status(500).end();
    }
});

export {
    gender_clothRoutes
};
