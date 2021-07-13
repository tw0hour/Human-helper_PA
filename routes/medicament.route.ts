import express from "express";
import {MedicamentController} from "../controllers/medicament.controller";
import { VolunteerController } from "../controllers/volunteer.controller";
import {AssociationController} from "../controllers/association.controller";
import {DeliveryController} from "../controllers/delivery.controller";
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
 * get all  medicament in stock
 */
medicamentRoutes.get("/inStock",async function(req,res){
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.getAllInStock();

    if(medicament) {
        res.json(medicament);
        res.status(201).end();
    }else{
        res.status(500).end();
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
 * get all medicament by delivery
 */
medicamentRoutes.get("/delivery/:delivery_id",async function(req,res){
    const delivery_id = req.params.delivery_id;
    if(delivery_id === undefined){
        res.status(400).end();
        return;
    }
    const deliveryController = await DeliveryController.getInstance();
    const delivery = await deliveryController.getById(delivery_id);
    if(delivery === null){
        res.status(404).end();
        return;
    }else{
        const medicamentController = await MedicamentController.getInstance();
        const medicament = await medicamentController.getAllByDelivery(parseInt(delivery_id));

        if(medicament) {
            res.json(medicament);
            res.status(201).end();
        }else{
            res.status(500).end();
        }
    }
});


/**
 * AddByVolunteer
 */
medicamentRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const expirationDate = req.body.expirationDate;
    const volunteer_id = req.body.volunteer_id;
    const association_id = req.body.association_id;

    if (name === undefined || expirationDate === undefined || association_id === undefined || volunteer_id === undefined) {
        res.status(400).end();
        return;
    }

    const volunteerController = await VolunteerController.getInstance();
    const volunteer = await volunteerController.getById(volunteer_id);
    if (volunteer === null) {
        res.status(404).end();
        return;
    }

    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(association_id);
    if (association === null) {
        res.status(404).end();
        return;
    }

    const medicamentController = await MedicamentController.getInstance();
        const medicament = await medicamentController.add({
            name,
            expirationDate,
            volunteer_id,
            association_id
        });

        if(medicament) {
            res.json(medicament);
            res.status(201).end();
        } else {
            res.status(500).end();
            return;
        }


});

/**
 * AddByAssociation
 */
medicamentRoutes.post("/association/", async function(req, res) {
    const name = req.body.name;
    const expirationDate = req.body.expirationDate;
    const association_id = req.body.association_id;

    if (name === undefined || expirationDate === undefined || association_id === undefined) {
        res.status(400).end();
        return;
    }
    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(association_id);
    if(association !== null){

        const medicamentController = await MedicamentController.getInstance();
        const medicament = await medicamentController.add({
            name,
            expirationDate,
            association_id
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


    if (id === undefined) {
        res.status(400).end();
        return;
    }
    const medicamentController = await MedicamentController.getInstance();
    const medicament = await medicamentController.getById(id);
    if (medicament === null){
        res.status(404).end();
        return;
    }else{
        let delivery_id = medicament.delivery_id;

        if(req.body.delivery_id !== undefined){
            delivery_id = req.body.delivery_id;
            if(delivery_id === undefined){
                res.status(400).end();
                return;
            }
            const deliveryController = await DeliveryController.getInstance();
            const delivery = await deliveryController.getById(delivery_id.toString());
            if (delivery === null){
                res.status(404).end();
                return;
            }
        }
        const name = req.body.name || medicament.name;
        const expirationDate = req.body.expirationDate || medicament.expirationDate;

        const medicamentUpdate = await medicamentController.update({
            id:parseInt(id),
            name,
            expirationDate,
            delivery_id
        });

        if(medicamentUpdate) {
            res.json(medicamentUpdate);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
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
    const medicament = await medicamentController.getById(id);
    if (medicament === null){
        res.status(404).end();
        return;
    }else{
        const medicamentDelete = await medicamentController.removeById(id);

        if(medicamentDelete) {
            res.json(medicamentDelete);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }


});

export {
    medicamentRoutes
};
