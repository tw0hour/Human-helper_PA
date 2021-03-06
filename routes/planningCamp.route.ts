import express from "express";
import {PlanningCampController} from "../controllers/planningCamp.controller";

const planningCampRoutes = express();
const cors = require('cors');
planningCampRoutes.use(cors());
/**
 * GetAll
 */
planningCampRoutes.get("/",async function(req, res){
    const planningCampController = await  PlanningCampController.getInstance();
    const planningCamp = await planningCampController.getAll();

    if(planningCamp){
        res.json(planningCamp);
        res.status(201).end();
    }
});

/**
 * GetById
 */
planningCampRoutes.get("/:id",async function(req, res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const planningCampController = await  PlanningCampController.getInstance();
    const planningCamp = await planningCampController.getById(id);

    if(planningCamp) {
        res.json(planningCamp);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
planningCampRoutes.post("/", async function(req, res) {
    const day = req.body.day;
    const timeSlot = req.body.timeSlots;

    if (day === undefined || timeSlot === undefined) {
        res.status(400).end();
        return;
    }
    const planningCampController = await  PlanningCampController.getInstance();
    const planningCamp = await planningCampController.add({
        day,
        time_slots : timeSlot
    });

    if(planningCamp) {
        res.json(planningCamp);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
planningCampRoutes.put("/:id",async function(req, res){
    const id = req.params.id;


    if (id === undefined) {
        res.status(400).end();
        return;
    }
    const planningCampController = await  PlanningCampController.getInstance();
    const planningCamp = await planningCampController.getById(id);
    if (planningCamp === null){
        res.status(404).end();
        return;
    }else{
        const day = req.body.day || planningCamp.day;
        const timeSlot = req.body.timeSlots || planningCamp.time_slots;
        const planningCampUpdate = await planningCampController.update({
            id:parseInt(id),
            day,
            timeSlots : timeSlot
        });

        if(planningCampUpdate) {
            res.json(planningCampUpdate);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }

});

/**
 * Delete
 */
planningCampRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const planningCampController = await  PlanningCampController.getInstance();
    const planningCamp = await planningCampController.getById(id);
    if(planningCamp === null){
        res.status(404).end();
        return;
    }else{
        const planningCampDelete = await planningCampController.removeById(id);

        if(planningCampDelete) {
            res.json(planningCampDelete);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }

});

export {
    planningCampRoutes
};
