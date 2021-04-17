import express from "express";

const deliveryRoutes = express();

deliveryRoutes.get("/",async function(req,res){
    res.send("get");
});

deliveryRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

deliveryRoutes.post("/", async function(req, res) {
    res.send("post");
});

deliveryRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

deliveryRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    deliveryRoutes
};