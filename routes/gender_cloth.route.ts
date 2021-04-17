import express from "express";

const gender_clothRoutes = express();

gender_clothRoutes.get("/",async function(req,res){
    res.send("get");
});

gender_clothRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

gender_clothRoutes.post("/", async function(req, res) {
    res.send("post");
});

gender_clothRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

gender_clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    gender_clothRoutes
};