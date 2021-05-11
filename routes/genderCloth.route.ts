import express from "express";
import {GenderClothController} from "../controllers/genderCloth.controller";

const gender_clothRoutes = express();

/**
 * GetAll
 */
gender_clothRoutes.get("/",async function(req,res){
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
gender_clothRoutes.get("/:id",async function(req,res){
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
gender_clothRoutes.post("/", async function(req, res) {
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
gender_clothRoutes.put("/:id",async function(req,res){
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
gender_clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
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
    gender_clothRoutes
};
