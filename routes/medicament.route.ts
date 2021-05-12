import express from "express";
import {MedicamentController} from "../controllers/medicament.controller";

const medicamentRoutes = express();

/**
 * GetAll
 */
medicamentRoutes.get("/",async function(req,res){
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.getAll();

    if(medicament){
        res.json(medicament);
        res.status(201).end();
    }
});

/**
 * GetById
 */
medicamentRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.getById(id);

    if(medicament) {
        res.json(medicament);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
medicamentRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const expirationDate = req.body.expirationDate;

    if (name === undefined || expirationDate === undefined) {
        res.status(400).end();
        return;
    }
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.add({
        day: name,
        timeSlots: expirationDate
    });
    if(medicament) {
        res.json(medicament);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
medicamentRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const name = req.body.name;
    const expirationDate = req.body.expirationDate;

    if (id === undefined || name === undefined || expirationDate === undefined) {
        res.status(400).end();
        return;
    }
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.update({
        id,
        name,
        expirationDate
    });

    if(medicament) {
        res.json(medicament);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
medicamentRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.removeById(id);

    if(medicament) {
        res.json(medicament);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    medicamentRoutes
};
