import express from "express";

import seedDatabase from "../../controllers/seeder.js";

const router = express.Router();

router.post("/", seedDatabase);

export default router;
