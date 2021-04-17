import express from "express";

const givenRoutes = express();

givenRoutes.get("/",async function(req,res){
    res.send("get");
});

givenRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

givenRoutes.post("/", async function(req, res) {
    res.send("post");
});

givenRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

givenRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    givenRoutes
};