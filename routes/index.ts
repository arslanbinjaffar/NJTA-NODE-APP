import express from "express";
const router = express.Router();

router.get("/", function (req: express.Request, res: express.Response) {
  res.send("Welcome to express home page");
});

export default router;
