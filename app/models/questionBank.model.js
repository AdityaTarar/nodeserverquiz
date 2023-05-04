const mongoose = require("mongoose");

const QuestionBank = mongoose.model(
  "QuestionBank",
  new mongoose.Schema({
    title: String,
    description: String,
    subject: String,
    difficultyLevel: String,
    quizDuration: String,
    questionDuration: String,
    options: [
      {
        option1: { optionTitle: String, score: String },
        option2: { optionTitle: String, score: String },
        option3: { optionTitle: String, score: String },
        option4: { optionTitle: String, score: String },
      },
    ],

    correctAnswer: String,
    // option1: [{ optionTitle: String ,score:String}],
    // option2: String,
    // option3: String,
    // option4: String,
    // option1_Score: String,
    // option2_Score: String,
    // option3_Score: String,
    // option4_Score: String,

    createdBy: String,
    questionAddedInQuiz: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizBank",
      },
    ],
  })
);

module.exports = QuestionBank;
