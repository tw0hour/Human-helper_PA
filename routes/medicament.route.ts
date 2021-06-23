import express from "express";
import {MedicamentController} from "../controllers/medicament.controller";
import { VolunteerController } from "../controllers/volunteer.controller";
const medicamentRoutes = express();

const cors = require('cors');
medicamentRoutes.use(cors());

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
    const volunteer_id = req.body.volunteer_id;

    if (name === undefined || expirationDate === undefined || volunteer_id === undefined) {
        res.status(400).end();
        return;
    }
    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getById(volunteer_id);
    if(volunteer !== null){

        const medicamentController = await MedicamentController.getInstance();
        const medicament = await medicamentController.add({
            name,
            expirationDate,
            volunteer_id
        });

        if(medicament) {
            res.json(medicament);
            res.status(201).end();
        } else {
            res.status(500).end();
            return;
        }
    }else{
        res.status(404).end();
        return;
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
