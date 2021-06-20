import { Express } from "express";
import { associationRoutes } from "./association.routes";
import { campRoutes } from "./camp.route";
import { clothRoutes } from "./cloth.route";
import { deliveryRoutes } from "./delivery.route";
import { donationRoutes } from "./donation.route";
import { foodRoutes } from "./food.route";
import { genderClothRoutes } from "./genderCloth.route";
import { medicamentRoutes } from "./medicament.route";
import { planningCampRoutes } from "./planningCamp.route";
import { typeClothRoutes } from "./typeCloth.route";
import { typeFoodRoutes } from "./typeFood.route";
import { volunteerRoutes } from "./volunteer.route";



export function buildRoutes(app:Express){
    app.use("/association",associationRoutes);
    app.use("/camp",campRoutes);
    app.use("/cloth",clothRoutes);
    app.use("/delivery",deliveryRoutes);
    app.use("/donation",donationRoutes);
    app.use("/food",foodRoutes);
    app.use("/genderCloth",genderClothRoutes);
    app.use("/medicament",medicamentRoutes);
    app.use("/planningCamp",planningCampRoutes);
    app.use("/typeCloth",typeClothRoutes);
    app.use("/typeFood",typeFoodRoutes);
    app.use("/volunteer",volunteerRoutes);
}
