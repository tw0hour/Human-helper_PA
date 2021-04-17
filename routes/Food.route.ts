import express from "express";

const foodRoutes = express();

foodRoutes.get("/",async function(req,res){
    res.send("get");
});

foodRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

foodRoutes.post("/", async function(req, res) {
    res.send("post");
});

foodRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

foodRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    foodRoutes
};