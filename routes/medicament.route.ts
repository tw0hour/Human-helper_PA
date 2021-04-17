import express from "express";

const medicamentRoutes = express();

medicamentRoutes.get("/",async function(req,res){
    res.send("get");
});

medicamentRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

medicamentRoutes.post("/", async function(req, res) {
    res.send("post");
});

medicamentRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

medicamentRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    medicamentRoutes
};