const mongoose = require("mongoose");

const QuizBank = mongoose.model(
  "QuizBank",
  new mongoose.Schema({
    title: String,
    swapable: String,
    standard: String,
    board: String,
    medium: String,
    negativeMarking: String,
    quizDuration: String,
    isActive: String,
    activeFrom: String,
    activeTo: String,
    createdBy: String,
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionBank",
      },
    ],
  })
);

module.exports = QuizBank;
