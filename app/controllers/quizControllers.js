const db = require("../models");

const QuestionBank = db.questionBank;
const QuizBank = db.quizBank;
const Results = db.results;

exports.addQuestions = (req, res) => {
  const question = new QuestionBank({
    title: req.body.title,
    description: req.body.description,
    subject: req.body.subject,
    difficultyLevel: req.body.difficultyLevel,
    quizDuration: req.body.quizDuration,
    questionDuration: req.body.questionDuration,
    options: req.body.options,
    // option1: req.body.option1,
    // option2: req.body.option2,
    // option3: req.body.option3,
    // option4: req.body.option4,
    correctAnswer: req.body.correctAnswer,
    // option1_Score: req.body.option1_Score,
    // option2_Score: req.body.option2_Score,
    // option3_Score: req.body.option3_Score,
    // option4_Score: req.body.option4_Score,
    createdBy: req.body.createdBy,
  });

  question.save((err, question) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    question.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "Question was added successfully!" });
    });
  });
};
exports.createQuiz = (req, res) => {
  const quiz = new QuizBank({
    quizDuration: req.body.quizDuration,
    isActive: req.body.isActive,
    activeFrom: req.body.activeFrom,
    activeTo: req.body.activeTo,
    createdBy: req.body.createdBy,
    questions: req.body.questions,
    title: req.body.title,
    board: req.body.board,
    medium: req.body.medium,
    negativeMarking: req.body.negativeMarking,
    swapable: req.body.swapable,
    standard: req.body.standard,
  });
  console.log("req.body", req.body);
  quiz.save((err, quiz) => {
    quiz.save((err) => {
      if (err) {
        res.send(err);
      }
      addQuestionstoQuiz(req.body.questions).then((Results) => {
        res.send("quiz Created");
      });
    });
  });
};
exports.getQuizById = (req, res) => {
  QuizBank.findById(req.query.quizBankId)
    .populate("questions")
    .then((quiz) => {
      res.send(quiz);
    });
};
exports.getAllQuizAvailable = async (req, res) => {
  // QuizBank.find()
  //   .populate("questions")
  //   .then((quiz) => {
  //     res.send(quiz);
  //   });
  const userId = req.query.userId;
  const attemptedQuizzes = await Results.find({ userId });
  const attemptedQuizIds = attemptedQuizzes.map((quiz) => quiz.quizBankId);
  const quizData = await QuizBank.find({ _id: { $nin: attemptedQuizIds } });
  res.json(quizData);
};
exports.getAllQuestions = (req, res) => {
  QuestionBank.find().then((quiz) => {
    res.send(quiz);
  });
};
const addQuestionstoQuiz = function (tag) {
  return db.quizBank.findByIdAndUpdate(
    "6419422756e7fe6961911d69",
    { $push: { questions: tag } },
    { new: true, useFindAndModify: false }
  );
};
