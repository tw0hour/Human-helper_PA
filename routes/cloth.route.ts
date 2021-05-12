import express from "express";
import {ClothController} from "../controllers/cloth.controller";

const clothRoutes = express();

/**
 * GetAll
 */
clothRoutes.get("/",async function(req,res){
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getAll();

    if(cloth) {
        res.json(cloth);
        res.status(201).end();
    }
});

/**
 * GetById
 */
clothRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getById(id);

    if(cloth) {
        res.json(cloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
clothRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const size = req.body.size;
    const typeCloths = req.body.typeCloths;
    const gender = req.body.gender;

    if (name === undefined || size === undefined || typeCloths === undefined || gender === undefined) {
        res.status(400).end();
        return;
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.add({
        name,
        size,
        typeCloths,
        gender
    });

    if(cloth) {
        res.json(cloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }

});

/**
 * Update
 */
clothRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const name = req.body.name;
    const size = req.body.size;
    const typeCloths = req.body.typeCloths;
    const gender = req.body.gender;

    if (name === undefined || size === undefined || typeCloths === undefined || gender === undefined) {
        res.status(400).end();
        return;
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.update({
        id,
        name,
        size,
        typeCloths,
        gender
    });

    if(cloth) {
        res.json(cloth);
        res.status(201).end();
    } else {
        res.status(404).end();
    }

});

/**
 * Delete
 */
clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === undefined) {
        res.status(400).end();
    }
    const clothController = await ClothController.getInstance();
    const clothDelete = await clothController.removeById(id);

    if(clothDelete)
    {
        res.json(clothDelete);
        res.status(204).end();
    }
    else
    {
        res.status(404).end();
    }
});

export {
    clothRoutes
};
