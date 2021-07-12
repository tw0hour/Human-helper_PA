import express from "express";
import {ClothController} from "../controllers/cloth.controller";
import { VolunteerController } from "../controllers/volunteer.controller";
import { TypeClothController } from "../controllers/typeCloth.controller";
import { GenderClothController } from "../controllers/genderCloth.controller";
import { AssociationController } from "../controllers/association.controller";
import { DeliveryController } from "../controllers/delivery.controller";

const clothRoutes = express();
const cors = require('cors');
clothRoutes.use(cors());

/**
 * GetAll
 */
clothRoutes.get("/",async function(req,res){
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getAll();

    if(cloth) {
        res.json(cloth);
        res.status(201).end();
    }else{
        res.status(500).end();
    }
});

/**
 * get all  cloth in stock
 */
clothRoutes.get("/inStock",async function(req,res){
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getAllInStock();

    if(cloth) {
        res.json(cloth);
        res.status(201).end();
    }else{
        res.status(500).end();
    }
});

/**
 * get all  cloth in stock
 */
clothRoutes.get("/delivery/:delivery_id",async function(req,res){
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
        const clothController = await ClothController.getInstance();
        const cloth = await clothController.getAllByDelivery(parseInt(delivery_id));

        if(cloth) {
            res.json(cloth);
            res.status(201).end();
        }else{
            res.status(500).end();
        }
    }
});


/**
 * GetById
 */
clothRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined)
    {
        res.status(400).end();
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getById(id);

    if(cloth)
    {
        res.json(cloth);
        res.status(201).end();
    } else {
        res.status(404).end();
        return;
    }
});


/**
 * Add
 */
clothRoutes.post("/", async function(req, res) {
    const name = req.body.name;
    const size = req.body.size;
    const volunteer_id = req.body.volunteer_id || null;
    const association_id = req.body.association_id;
    const type_cloth_id = req.body.type_cloth_id;
    const gender_cloth_id = req.body.gender_cloth_id;

    if (association_id === undefined || name === undefined || size === undefined || type_cloth_id === undefined || gender_cloth_id === undefined)
    {
        res.status(400).end();
        return;
    }
    if (volunteer_id !== null){
        const volunteerController = await VolunteerController.getInstance();
        const volunteer = await volunteerController.getById(volunteer_id);
        if (volunteer === null){
            res.status(404).end();
            return;
        }
    }
    const associationController = await AssociationController.getInstance();
    const association = await associationController.getById(association_id);
    const typeClothController = await TypeClothController.getInstance();
    const typeCloth = await typeClothController.getById(type_cloth_id);
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.getById(gender_cloth_id);

    if(genderCloth === null || typeCloth === null || association === null)
    {
        res.status(404).end();
        return;
    }
    else
    {
        const clothController = await ClothController.getInstance();
        const cloth = await clothController.add({
            name,
            size,
            volunteer_id,
            association_id,
            type_cloth_id,
            gender_cloth_id,
            delivery_id:null
        });

        if(cloth) {
            res.json(cloth);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }
});


/**
 * Update one or several attribute in a cloth
 */
clothRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    if (id === undefined)
    {
        res.status(400).end();
        return;
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getById(id);
    if(cloth === null)
    {
        res.status(404).end();
        return;
    }
    else
    {
        const delivery_id = req.body.delivery_id || null;
        if(delivery_id !== undefined && delivery_id){
            const deliveryController = await DeliveryController.getInstance();
            const delivery = await deliveryController.getById(delivery_id);
            if (delivery === null){
                res.status(404).end();
                return;
            }
        }
        const name = req.body.name || cloth?.name;
        const size = req.body.size || cloth?.size;

        const clothUpdate = await clothController.update({
            id:parseInt(id),
            name,
            size,
            delivery_id
        });
        if(clothUpdate)
        {
            res.json(clothUpdate);
            res.status(201).end();
        }
        else
        {
            res.status(500).end();
        }
    }
});


/**
 * update genderClothId
 * */
clothRoutes.put("/cloth/:id/GenderCloth/:genderClothId",async function(req,res){
    const id = req.params.id;
    const genderClothId = req.params.genderClothId;
    if (id === undefined || genderClothId === undefined)
    {
        res.status(400).end();
        return;
    }
    const genderClothController = await GenderClothController.getInstance();
    const genderCloth = await genderClothController.getById(genderClothId);
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getById(id);
    if(genderCloth === null || cloth === null)
    {
        res.status(404).end();
        return;
    }
    else
    {
        const clothUpdate = await clothController.update({
            id:parseInt(id),
            gender_cloth_id:parseInt(genderClothId)
        });
        if(clothUpdate){
            res.json(clothUpdate);
            res.status(200).end();
        }else{
            res.status(500);
            return;
        }
    }
});


/**
 * Update type cloth id
 */
clothRoutes.put("/cloth/:id/TypeCloth/:typeClothId",async function(req,res){
    const id = req.params.id;
    const typeClothId = req.params.typeClothId;
    if (id === undefined || typeClothId === undefined)
    {
        res.status(400).end();
        return;
    }
    const typeClothController = await TypeClothController.getInstance();
    const typeCloth = await typeClothController.getById(typeClothId);
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getById(id);
    if(typeCloth === null || cloth === null)
    {
        res.status(404).end();
        return;
    }
    else
    {
        const clothUpdate = await clothController.update({
            id:parseInt(id),
            type_cloth_id:parseInt(typeClothId)
        });
        if(clothUpdate){
            res.json(clothUpdate);
            res.status(200).end();
        }else{
            res.status(500);
            return;
        }
    }
});


/**
 * Delete by id
 */
clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;

    if(id === undefined) {
        res.status(400).end();
    }
    const clothController = await ClothController.getInstance();
    const cloth = await clothController.getById(id);
    if(cloth === null)
    {
        res.status(404).end();
        return;
    }
    else
    {
        const clothDelete = await clothController.removeById(id);
        if(clothDelete)
        {
            res.json(clothDelete);
            res.status(204).end();
        }
        else
        {
            res.status(500).end();
            return;
        }
    }
});

export {
    clothRoutes
};
