import express from "express";

const type_clothRoutes = express();

type_clothRoutes.get("/",async function(req,res){
    res.send("get");
});

type_clothRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

type_clothRoutes.post("/", async function(req, res) {
    res.send("post");
});

type_clothRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

type_clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    type_clothRoutes
};