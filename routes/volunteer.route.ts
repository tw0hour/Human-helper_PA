import express from "express";

const volunteerRoutes = express();

volunteerRoutes.get("/",async function(req,res){
    res.send("get");
});

volunteerRoutes.get("/:id",async function(req,res){
    res.send("get by id" + req.params.id);
});

volunteerRoutes.post("/", async function(req, res) {
    res.send("post");
});

volunteerRoutes.put("/:id",async function(req,res){
    res.send("update" + req.params.id);
});

volunteerRoutes.delete("/:id" /*, authMiddleware*/, async function(req, res) {
    res.send("delete" + req.params.id);
});

export {
    volunteerRoutes
};