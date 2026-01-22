import { Router } from "express";
import { getFilters } from "../controllers/filtersController.js";

const router = Router();

router.get("/", getFilters);

export default router;
