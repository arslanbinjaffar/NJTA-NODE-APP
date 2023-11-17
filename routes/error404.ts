import express from "express";
const router = express.Router();

router.use((req, res) => {
  res.status(404).send("404! Invalid api route");
});

export default router;
