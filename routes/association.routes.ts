import express from "express";

const associationRoutes = express();

associationRoutes.get("/",async function(req,res){
    res.send("get");
});

associationRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

associationRoutes.post("/", async function(req, res) {
    res.send("post");
});




associationRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

associationRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
   res.send("delete" + req.params.id);
});

export {
    associationRoutes
};