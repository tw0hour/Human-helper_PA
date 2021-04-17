import express from "express";

const panning_campRoutes = express();

panning_campRoutes.get("/",async function(req,res){
    res.send("get");
});

panning_campRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

panning_campRoutes.post("/", async function(req, res) {
    res.send("post");
});

panning_campRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

panning_campRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    panning_campRoutes
};