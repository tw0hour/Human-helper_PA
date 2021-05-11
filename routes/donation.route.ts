import express from "express";
import {DonationController} from "../controllers/donation.controller";

const donationRoutes = express();

/**
 * GetAll
 */
donationRoutes.get("/",async function(req,res){
    const donationController = await DonationController.getInstance();
    const donation = await donationController.getAll();

    if(donation){
        res.status(201).end();
        res.json(donation).end();
    }
});

/**
 * GetById
 */
donationRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const donationController = await DonationController.getInstance();
    const donation = await donationController.getById(id);

    if(donation) {
        res.json(donation);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
donationRoutes.post("/", async function(req, res) {
    const amount_given = req.body.amount_given;
    const date = req.body.date;

    if(amount_given === undefined || date === undefined) {
        res.status(400).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const donation = await donationController.add({
        amount_given,
        date
    });

    if(donation) {
        res.status(201).end();
        res.json(donation);
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
donationRoutes.put("/:id",async function(req,res){
    const id = req.body.id;
    const amount_given = req.body.amount_given;
    const date = req.body.date;

    if(id === undefined || amount_given === undefined || date === undefined) {
        res.status(400).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const donation = await donationController.update({
        id,
        amount_given,
        date
    });
});

/**
 * Delete
 */
donationRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const donationController = await DonationController.getInstance();
    const donationDelete = await donationController.removeById(id);

    if(donationDelete) {
        res.status(201).end();
        res.json(donationDelete);
    } else {
        res.status(500).end();
    }
});

export {
    donationRoutes
};
