import express from "express";
import {getAllTyres, getTyreById, createTyre, updateTyre, deleteTyre}from"../Controllers/tyrecontrollers.js"

const  router = express.Router();
router.get("/", getAllTyres);
router.get("/:id", getTyreById);
router.post("/", createTyre);
router.put("/:id", updateTyre);
router.delete("/:id", deleteTyre);

export default router