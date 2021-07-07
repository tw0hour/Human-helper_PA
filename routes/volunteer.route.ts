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
 * Connexion
 * @param  name, password
 */
volunteerRoutes.post("/connection",async function (req, res){
    const name = req.body.name;
    const password = req.body.password;
    if(name === undefined || password === undefined){
        res.status(400).end();
    }
    const volunteerController = await VolunteerController.getInstance();
    const user = await volunteerController.connection(name, password);

    if(!user){
        console.log("Connexion refusée !");
        res.status(404).end();
        return;
    }else{
        console.log("Connexion réussie ! ")
        res.json(user);
        res.status(204).end();
    }
});

/**
 * Update
 */
volunteerRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    const password = req.body.password;

    if (id === undefined || password === undefined ) {
        res.status(400).end();
        return;
    }
    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getById(id);
    if (volunteer === null){
        res.status(404).end();
        return;
    }else{
        //TODO: a voir avec kelyan, si l'utilisateur ne changes pas de mdp
        const checkOldPassword = await volunteerController.passwordSameAsTheOldOne(id, password);
        if (checkOldPassword){
            res.status(400).end();
        }

        //const password = req.body.password || volunteer.password;
        const name = req.body.name || volunteer.name;
        const mail = req.body.mail || volunteer.mail;
        const type = req.body.type || volunteer.type;
        const volunteerUpdate = await volunteerController.update({
            id:parseInt(id),
            name,
            mail,
            password,
            type
        });

        if(volunteerUpdate) {
            res.json(volunteerUpdate);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
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
    const volunteer = await volunteerController.getById(id);
    if (volunteer === null){
        res.status(404).end();
        return;
    }else{
        const volunteerDelete = await volunteerController.removeById(id);
        if(volunteerDelete) {
            res.json(volunteerDelete);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }

});

export {
    volunteerRoutes
};
