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
        res.json(donation);
        res.status(201).end();
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
    const amountGiven = req.body.amountGiven;
    const date = req.body.date;

    if(amountGiven === undefined || date === undefined) {
        res.status(400).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const donation = await donationController.add({
        amountGiven: amountGiven,
        date
    });

    if(donation) {
        res.json(donation);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/*
 * Update
 */
/*donationRoutes.put("/:id",async function(req,res){
    const id = req.body.id;
    const amountGiven = req.body.amountGiven;
    const date = req.body.date;

    if(id === undefined || amountGiven === undefined || date === undefined) {
        res.status(400).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const donation = await donationController.update({
        id,
        amountGiven: amountGiven,
        date
    });
    if (donation){
        res.json(donation);
        res.status(200).end();
    }
});*/

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
        res.json(donationDelete);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    donationRoutes
};
