import express from "express";
import {
  deleteOption,
  addVote,
  getAllOptions,
} from "../controllers/options.controller.js";

const router = express.Router();

router.route("/:id").get(getAllOptions);

router.route("/:id").delete(deleteOption);

router.route("/:id/add_vote").put(addVote);

export default router;
