import {
  addNewOptionRepo,
  addVoteLinkRepo,
  getAllOptionsRepo,
  hasOptionVotesRepo,
  deleteOptionRepo,
  addVoteRepo,
} from "../models/options.repository.js";
import { customErrorHandler } from "../../../middlewares/errorHandlerMiddleware.js";

export const addNewOptions = async (req, res, next) => {
  try {
    const option = await addNewOptionRepo(req.params.id, {
      ...req.body,
    });
    if (option) {
      const updatedOption = await addVoteLinkRepo(option.id);
      res.status(201).json({ success: true, updatedOption });
    } else {
      return next(
        new customErrorHandler(
          400,
          "An error occured! Cannot add options to the question!!"
        )
      );
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const getAllOptions = async (req, res, next) => {
  try {
    const options = await getAllOptionsRepo();

    if (options) {
      res.status(200).json({ success: true, options });
    } else {
      return next(new customErrorHandler(400, "No options found!"));
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const deleteOption = async (req, res, next) => {
  try {
    const optionHasVotes = await hasOptionVotesRepo(req.params.id);
    if (optionHasVotes) {
      return next(
        new customErrorHandler(400, "Option has a vote and cannot be deleted!")
      );
    }

    const deletedOption = await deleteOptionRepo(req.params.id);
    if (deletedOption) {
      res.status(201).json({ success: true, deletedOption });
    } else {
      return next(new customErrorHandler(400, "No option found to delete!"));
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};

export const addVote = async (req, res, next) => {
  try {
    const updatedOption = await addVoteRepo(req.params.id);
    if (updatedOption) {
      res.status(201).json({ success: true, updatedOption });
    } else {
      return next(
        new customErrorHandler(
          400,
          "An error occured! Cannot add vote to the option!!"
        )
      );
    }
  } catch (error) {
    return next(new customErrorHandler(500, error));
  }
};
