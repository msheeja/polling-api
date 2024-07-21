import express from "express";
import {
  createNewQuestion,
  addOptions,
  deleteQuestion,
  getQuestion,
  getAllQuestions
} from "../controllers/question.controller.js";

const router = express.Router();

router.route("/create").post(createNewQuestion);
router.route("/:id/options/create").post(addOptions);

router.route("/:id").delete(deleteQuestion);

router.route("/:id").get(getQuestion);
router.route("/").get(getAllQuestions);

export default router;
