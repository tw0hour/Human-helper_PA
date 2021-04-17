import express from "express";

const campRoutes = express();

campRoutes.get("/",async function(req,res){
    res.send("get");
});

campRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

campRoutes.post("/", async function(req, res) {
    res.send("post");
});

campRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

campRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    campRoutes
};