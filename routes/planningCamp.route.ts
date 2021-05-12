import express from "express";
import {PlanningCampController} from "../controllers/planningCamp.controller";

const planningCampRoutes = express();

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
    const day = req.body.day;
    const timeSlot = req.body.timeSlots;

    if (id === undefined || day === undefined || timeSlot === undefined) {
        res.status(400).end();
        return;
    }
    const planningCampController = await  PlanningCampController.getInstance();
    const planningCamp = await planningCampController.update({
        id,
        day,
        timeSlots : timeSlot
    });

    if(planningCamp) {
        res.json(planningCamp);
        res.status(201).end();
    } else {
        res.status(500).end();
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
    const planningCamp = await planningCampController.removeById(id);

    if(planningCamp) {
        res.json(planningCamp);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    planningCampRoutes
};
