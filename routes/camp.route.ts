import express from "express";
import {CampController} from "../controllers/camp.controller";
import { AssociationController } from "../controllers/association.controller";
import { PlanningCampController } from "../controllers/planningCamp.controller";

const campRoutes = express();


/**
 * GetAll
 */
campRoutes.get("/",async function(req,res){
    const campController = await CampController.getInstance();
    const camp = await campController.getAll();
    if(camp)
    {
        res.json(camp);
        res.status(201).end();
    }
    else
    {
        res.status(401).end();
    }
});


/**
 * GetById
 */
campRoutes.get("/:id",async function(req,res){
    const id = req.params.id;
    if(id === undefined) {
        res.status(400).end();
    }
    const campController = await CampController.getInstance();
    const camp = await campController.getById(id);

    if(camp) {
        res.json(camp);
        res.status(200).end();
    } else
    {
        res.status(404).end();
    }
});


/**
 * Add
 * Maybe check if already exist on same Address
 */
campRoutes.post("/", async function(req, res) {
    const nbPeople = req.body.nbPeople;
    const city = req.body.city;
    const address = req.body.address;
    const postalCode = req.body.postalCode;

    if(nbPeople === undefined || city === undefined || address === undefined || postalCode === undefined) {
        res.status(400).end();
        return;
    }
    const campController = await CampController.getInstance();
    const camp = await campController.add({
        nbPeople,
        city,
        address,
        postalCode,
        association_id:null,
        planning_camp_id:null
    });

    if(camp) {
        res.json(camp);
        res.status(201).end();
    } else {
        res.status(500).end();
    }
});


/**
 * Delete by id
 * TODO: a voir plus tard les actions a effectuer avec l'id de l'associations et du camp qui lui sont attribué
 */
campRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    const id = req.params.id;
    if (id === undefined)
    {
        res.status(400).end();
    }

    const campController = await CampController.getInstance();
    const camp = campController.getById(id);

    if (camp)
    {
        res.status(404).end();
        return;
    }
    else
    {
        const deleteCamp = await campController.removeById(id);
        if (deleteCamp)
        {
            res.json(deleteCamp);
            res.status(201).end();
        }else
        {
            res.status(500).end();
        }
    }
});


/**
 * Update un ou plusieurs éléments d'un camps
 */
campRoutes.put("/:id",async function(req,res){
    const id = req.params.id;

    if( id === undefined ) {
        res.status(400).end();
        return;
    }

    const campController = await CampController.getInstance();
    const camp = await campController.getById(id);

    if(camp === undefined){
        /** pas de camps a cet id */
        res.status(404).end();
        return;
    }else{

        /* si une infos n'est pas renseignée, on la laisse par défaut */
        const nbPeople = req.body.nbPeople || camp?.nbPeople;
        const city = req.body.city || camp?.city;
        const address = req.body.address || camp?.address;
        const postalCode = req.body.postalCode || camp?.postalCode;

        const updateCamp = await campController.update({
            id,
            nbPeople,
            city,
            address,
            postalCode
        });

        if(updateCamp) {
            res.json(updateCamp);
            res.status(201).end();
        } else {
            res.status(500).end();
        }
    }
});

/**
 * Add association to camp
 */
campRoutes.put("/camp/:id/association/:associationId",async function(req,res){
    const association_id = req.params.associationId;
    const id = req.params.id;
    if(id === undefined || association_id === undefined || association_id === null){
        res.status(400).end()
    }else{
        const associationController = await AssociationController.getInstance();
        const association = await associationController.getById(association_id);

        const campController = await CampController.getInstance();
        const camp = await campController.getById(id);

        if(camp === null || association === null){
            res.status(404).end();
            return;
        }else{
            const updateAssociationIdInCamp = await campController.update({
                id,
                association_id: parseInt(association_id)
            });

            if(updateAssociationIdInCamp === null){
                res.status(500).end();
                return;
            }else{
                res.json(updateAssociationIdInCamp);
                res.status(201).end();
            }
        }
    }

});

/**
 * Add planning to camp
 */
campRoutes.put("/camp/:id/planning/:planningId",async function(req,res){
    const planning_camp_id = req.params.planningId;
    const id = req.params.id;
    if(id === undefined || planning_camp_id === null){
        res.status(400).end()
    }
    const planningCampController = await PlanningCampController.getInstance();
    const planning = await planningCampController.getById(planning_camp_id);

    const campController = await CampController.getInstance();
    const camp = await campController.getById(id);

    if(camp === null || planning === null){
        res.status(404).end();
        return;
    }else{
        const updateAssociationIdInCamp = await campController.update({
            id,
            planning_camp_id:parseInt(planning_camp_id)
        });
        if(updateAssociationIdInCamp === null){
            res.status(500).end();
            return;
        }else{
            res.json(updateAssociationIdInCamp);
            res.status(200).end();
        }
    }
});


export {
    campRoutes
};
