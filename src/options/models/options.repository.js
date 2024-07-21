import OptionsModel from "./options.schema.js";

export const addNewOptionRepo = async (_id, option) => {
  option.question = _id;
  option.votingLink = `http://localhost:${process.env.PORT}/options/add_vote`;
  return await new OptionsModel(option).save();
};

export const addVoteLinkRepo = async (_id) => {
  let option = await getOptionRepo(_id);
  option.votingLink = `http://localhost:${process.env.PORT}/options/${_id}/add_vote`;
  return await OptionsModel.findByIdAndUpdate(_id, option, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const getAllOptionsRepo = async () => {
  return await OptionsModel.find({});
};

export const getOptionRepo = async (_id) => {
  return await OptionsModel.findById(_id);
};

export const getOptionsForTheQuestionRepo = async (_questionId) => {
  return await OptionsModel.find({question : _questionId});
};

export const hasOptionVotesRepo = async (_id) => {
  const option = await getOptionRepo(_id);
  if (option) {
    return option.votes > 0;
  }
  return false;
};

export const deleteOptionRepo = async (_id) => {
  return await OptionsModel.findByIdAndDelete(_id);
};

export const addVoteRepo = async (_id) => {
  let option = await getOptionRepo(_id);
  option.votes += 1;
  return await OptionsModel.findByIdAndUpdate(_id, option, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};
