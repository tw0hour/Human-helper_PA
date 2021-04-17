import express from "express";

const donationRoutes = express();

donationRoutes.get("/",async function(req,res){
    res.send("get");
});

donationRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

donationRoutes.post("/", async function(req, res) {
    res.send("post");
});

donationRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

donationRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    donationRoutes
};