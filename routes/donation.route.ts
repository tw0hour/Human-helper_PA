import express from "express";
import {DonationController} from "../controllers/donation.controller";
import { VolunteerController } from "../controllers/volunteer.controller";
import { AssociationController } from "../controllers/association.controller";
import donation from "../models/donation";

const donationRoutes = express();
const cors = require('cors');
donationRoutes.use(cors());
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
    const volunteer_id = req.body.volunteer_id;
    const association_id = req.body.association_id;

    if(amountGiven === undefined || date === undefined || volunteer_id === undefined || association_id === undefined) {
        res.status(400).end();
        return;
    }

    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getById(volunteer_id);
    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(association_id);

    if(association === null || volunteer === null){
        res.status(404).end();
        return;
    }else{
        const donationController = await DonationController.getInstance();
        const donation = await donationController.add({
            amountGiven: amountGiven,
            date,
            volunteer_id,
            association_id
        });

        if(donation) {
            res.json(donation);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
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

/*************************Statistiques*************************/

donationRoutes.get("/nbDonation/:assocId", async function (req, res){
    const assocId = req.params.assocId;
    if (assocId === undefined){
        res.status(400).end();
    }

    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(assocId);

    if(association === null){
        res.status(404).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const stats = await donationController.nbDonation(assocId);

    if(stats === null){
        res.status(500).end();
    } else {
        res.json(stats);
        res.status(201).end();
    }
});

donationRoutes.get("/totalDonation/:assocId", async function (req, res){
    const assocId = req.params.assocId;
    if (assocId === undefined){
        res.status(400).end();
    }

    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(assocId);

    if(association === null){
        res.status(404).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const stats = await donationController.totalDonation(assocId);

    if(stats === null){
        res.status(500).end();
    } else {
        res.json(stats);
        res.status(201).end();
    }
});

donationRoutes.get("/maxDonation/:assocId", async function (req, res){
    const assocId = req.params.assocId;
    if (assocId === undefined){
        res.status(400).end();
    }

    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(assocId);

    if(association === null){
        res.status(404).end();
        return;
    }

    const donationController = await DonationController.getInstance();
    const stats = await donationController.maxDonation(assocId);

    if(stats === null){
        res.status(500).end();
    } else {
        res.json(stats);
        res.status(201).end();
    }
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
    const donation = await donationController.getById(id);
    if(donation === null){
        res.status(404).end();
        return;
    }else{
        const donationDelete = await donationController.removeById(id);

        if(donationDelete) {
            res.json(donationDelete);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }

});

export {
    donationRoutes
};
