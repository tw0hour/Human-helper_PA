import express from "express";
import {VolunteerController} from "../controllers/volunteer.controller";

const volunteerRoutes = express();

//CORS est un package node.js pour fournir un middleware Connect / Express et permettre
// d'autoriser les sites externe à utiliser notre API
const cors = require('cors');
volunteerRoutes.use(cors());

/**
 * GetAll
 */
volunteerRoutes.get("/", async function(req,res){
    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getAll();

    if(volunteer) {
        res.json(volunteer);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * GetById
 */
volunteerRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getById(id);

    if(volunteer) {
        res.json(volunteer);
        res.status(201).end();
    } else {
        res.status(404).end();
    }
});

/**
 * Add
 */
volunteerRoutes.post("/",async function(req, res) {
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const type = req.body.type;

    if (name === undefined || mail === undefined || password === undefined || type === undefined) {
        res.status(400).end();
        return;
    }
    const volunteerController = await VolunteerController.getInstance();
    const doublonMail = await volunteerController.checkDoublonMail(mail);
    if(doublonMail) {
        res.status(400).end();
        return;
    }
    const volunteer = await volunteerController.add({
        name,
        mail,
        password,
        type
    });
    if(volunteer) {
        res.json(volunteer);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Update
 */
volunteerRoutes.put("/:id",async function(req,res){
    const id = req.params.id;
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const type = req.body.type;

    if (id === undefined || name === undefined || mail === undefined || password === undefined || type === undefined) {
        res.status(400).end();
        return;
    }
    const volunteerController = await VolunteerController.getInstance();
    const checkOldPassword = await volunteerController.passwordSameAsTheOldOne(id, password);

    if (checkOldPassword){
        res.status(400).end();
    }
    const volunteer = await volunteerController.update({
        id,
        name,
        mail,
        password,
        type
    });

    if(volunteer) {
        res.json(volunteer);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

/**
 * Delete
 */
volunteerRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).end();
    }
    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.removeById(id);

    if(volunteer) {
        res.json(volunteer);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});

export {
    volunteerRoutes
};
