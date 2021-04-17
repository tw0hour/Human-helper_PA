import express from "express";

const clothRoutes = express();

clothRoutes.get("/",async function(req,res){
    res.send("get");
});

clothRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

clothRoutes.post("/", async function(req, res) {
    res.send("post");
});

clothRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

clothRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    clothRoutes
};