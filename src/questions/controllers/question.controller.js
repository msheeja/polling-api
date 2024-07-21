import {
  createNewQuestionRepo,
  getAllQuestionsRepo,
  getQuestionRepo,
  deleteQuestionRepo,
} from "../models/question.repository.js";
import { addNewOptions } from "../../options/controllers/options.controller.js";
import {
  getOptionsForTheQuestionRepo,
  hasOptionVotesRepo,
  deleteOptionRepo,
} from "../../options/models/options.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandlerMiddleware.js";

export const createNewQuestion = async (req, res, next) => {
  try {
    const question = await createNewQuestionRepo({
      ...req.body,
    });
    if (question) {
      res.status(201).json({ success: true, question });
    } else {
      return next(
        new customErrorHandler(
          400,
          "An error occured! Cannot create question!!"
        )
      );
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await getAllQuestionsRepo();

    if (questions) {
      res.status(200).json({ success: true, questions });
    } else {
      return next(new customErrorHandler(400, "No questions found!"));
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    const question = await getQuestionRepo(req.params.id);
    const options = await getOptionsForTheQuestionRepo(req.params.id);

    if (question) {
      res
        .status(200)
        .json({ success: true, question: question, options: options });
    } else {
      return next(new customErrorHandler(400, "No question found!"));
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const options = await getOptionsForTheQuestionRepo(req.params.id);
    if (options) {
      for (var i = 0; i < options.length; i++) {
        const optionId = options[i]._id;
        const optionHasVotes = await hasOptionVotesRepo(optionId);
        if (optionHasVotes) {
          return next(
            new customErrorHandler(
              400,
              "One of the option has a vote and cannot be deleted!"
            )
          );
        }
      }
    }

    for (var i = 0; i < options.length; i++) {
        const optionId = options[i]._id;
        await deleteOptionRepo(optionId);
    }

    const deletedQuestion = await deleteQuestionRepo(req.params.id);
    if (deletedQuestion) {
      res.status(201).json({ success: true, deletedQuestion });
    } else {
      return next(new customErrorHandler(400, "No question found to delete!"));
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const addOptions = async (req, res, next) => {
  return addNewOptions(req, res, next);
};
