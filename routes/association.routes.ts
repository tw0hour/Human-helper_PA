import express from "express";

const spaceRoutes = express();

spaceRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

spaceRoutes.get("/",async function(req,res){
    res.send("get");
});

spaceRoutes.post("/", async function(req, res) {
    res.send("post");
});




spaceRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

spaceRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
   res.send("delete" + req.params.id);
});

export {
    spaceRoutes
};