import QuestionModel from "./question.schema.js";

export const createNewQuestionRepo = async (question) => {
  return await new QuestionModel(question).save();
};

export const getAllQuestionsRepo = async () => {
  return await QuestionModel.find({});
};

export const getQuestionRepo = async (_id) => {
  return await QuestionModel.findById(_id);
};

export const deleteQuestionRepo = async (_id) => {
  return await QuestionModel.findByIdAndDelete(_id);
};

export const updateQuestionDetailsRepo = async (_id, updatedQuestion) => {
  return await QuestionModel.findByIdAndUpdate(_id, updatedQuestion, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};