import express from "express";

const typeFoodRoutes = express();

typeFoodRoutes.get("/",async function(req,res){
    res.send("get");
});

typeFoodRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

typeFoodRoutes.post("/", async function(req, res) {
    res.send("post");
});

typeFoodRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

typeFoodRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    typeFoodRoutes
};