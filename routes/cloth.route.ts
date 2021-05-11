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
        res.status(201).end();
        res.json(cloth).end();
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
    const name = await req.body.name;
    const size = await req.body.size;
    const type_cloth = await req.body.type_cloth;
    const gender = await req.body.gender;

    if (name === undefined || size === undefined || type_cloth === undefined || gender === undefined) {
        res.status(400).end();
        return;
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.add({
        name,
        size,
        type_cloth,
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
    const id = await req.params.id;
    const name = await req.body.name;
    const size = await req.body.size;
    const type_cloth = await req.body.type_cloth;
    const gender = await req.body.gender;

    if (name === undefined || size === undefined || type_cloth === undefined || gender === undefined) {
        res.status(400).end();
        return;
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.update({
        id,
        name,
        size,
        type_cloth,
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
    const cloth = await clothController.removeById(id);

    if(cloth)
    {
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
