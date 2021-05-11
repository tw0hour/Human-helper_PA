import express from "express";
import {Planning_campController} from "../controllers/planning_camp.controller";

const planning_campRoutes = express();

/**
 * GetAll
 */
planning_campRoutes.get("/",async function(req,res){
    const planning_campController = await  Planning_campController.getInstance();
    const planning_camp = await planning_campController.getAll();

    if(planning_camp){
        res.status(201).end();
        res.json(planning_camp).end();
    }
});

/**
 * GetById
 */
planning_campRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const planning_campController = await  Planning_campController.getInstance();
    const planning_camp = await planning_campController.getById(id);

    if(planning_camp) {
        res.json(planning_camp);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
planning_campRoutes.post("/", async function(req, res) {
    const day = req.body.day;
    const timeslot = req.body.timeslots;

    if (day === undefined || timeslot === undefined) {
        res.status(400).end();
        return;
    }
    const planning_campController = await  Planning_campController.getInstance();
    const planning_camp = await planning_campController.add({
        day,
        time_slots : timeslot
    });

    if(planning_camp) {
        res.status(201).end();
        res.json(planning_camp);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
planning_campRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const day = req.body.day;
    const timeslot = req.body.timeslots;

    if (id === undefined || day === undefined || timeslot === undefined) {
        res.status(400).end();
        return;
    }
    const planning_campController = await  Planning_campController.getInstance();
    const planning_camp = await planning_campController.update({
        id,
        day,
        time_slots : timeslot
    });

    if(planning_camp) {
        res.status(201).end();
        res.json(planning_camp);
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
planning_campRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const planning_campController = await  Planning_campController.getInstance();
    const planning_camp = await planning_campController.removeById(id);

    if(planning_camp) {
        res.status(201).end();
        res.json(planning_camp);
    } else {
        res.status(500).end();
    }
});

export {
    planning_campRoutes
};