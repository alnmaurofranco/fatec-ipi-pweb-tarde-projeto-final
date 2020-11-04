const { Router } = require("express");
const { index, createCategory, searchCategory } = require("../controllers/CategoryController");
const categoryRouter = Router();

categoryRouter.get("/", index);
categoryRouter.get("/:search", searchCategory);
categoryRouter.post("/create", createCategory);

module.exports = categoryRouter;
