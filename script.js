// Contains list of Questions, Choices and Answers we will use in our quiz.
let questions = [
  {
    question: "Commonly used data types DO NOT include: ",
    choices: ["strings", "booleans", "numbers", "alerts"],
    correct: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within _____.",
    choices: ["quotes", "parenthesis", "square brackets", "curly brackets"],
    correct: "curly brackets",
  },
  {
    question: "Arrays in Javascript can be used to store",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is: ",
    choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
    correct: "console log",
  },
];

// Starting point for our master questions array where we will extract our questions and answers.
var masterQuestionIndex = 0;

// Starting point for our number of correct answers.
var correctQuestions = 0;

// Message Displayed when answer chosen is Right or Wrong.
var message = ["Wrong! ", "Correct! "];

// Targets our elements displayed at the start of the quiz.
var startEl = document.getElementById("start");
var startButton = document.getElementById("start-button");

// Targets our elements that will render our Questions, Answers and Messages.
var questionEl = document.getElementById("questions");
var qTitleEl = document.getElementById("question-title");
var qAnswerEl = document.getElementById("question-answers");
var messageEl = document.getElementById("message");

// Targets our elements that will display at the end of the quiz.
var endEl = document.getElementById("end");

//**********************************************************************
var endScoreEl = document.getElementById("score");
var endInputEl = document.getElementById("initials");
var endSubmitButton = document.getElementById("submit-button");
var scoreListEl = document.querySelector("#score-list");
var clearScore = document.getElementById("clear-scores");
var goBack = document.getElementById("go-back");
//**********************************************************************

// Targets our element that will display our timer.
var timerElement = document.querySelector("#timer-count");

// Sets our timer count and our timer in a later function.
var timerCount;
var timer;

// Sets value of user's final score in a later function.
var finalScore;

//**********************************************************************
var savePlay;
var storedPlays = localStorage.getItem("savePlay");

if (storedPlays !== null) {
  savePlay = storedPlays;
}
//**********************************************************************
function renderScores() {
  userInitals = localStorage.getItem("initials");
  finalScore = localStorage.getItem("score");
  var scoreList = document.createElement("li");
  savePlay = userInitals + " - " + finalScore;
  scoreList.textContent = savePlay;

  scoreListEl.appendChild(scoreList);

  localStorage.setItem("savePlay", savePlay);

  goBack.addEventListener("click", function () {
    location.replace("./index.html");
  });
}

function saveScoreLocalStorage() {
  var userInitals = endInputEl.value.trim();
  localStorage.setItem("initials", userInitals);
  localStorage.setItem("score", finalScore);
  location.replace("./highscores.html");
  renderScores();
}
//**********************************************************************

// This function starts our quiz by hiding our starting elements. Initializes our timer and questions.
function startQuiz() {
  startEl.setAttribute("class", "hide");
  questionEl.removeAttribute("class");
  startTimer();
  renderQuestion();
}

// This is ran at the end of our quiz hiding our questions element and displaying our Game Over!.
function finishedQuiz() {
  calculateScore();
  questionEl.setAttribute("class", "hide");
  messageEl.setAttribute("class", "hide");
  endEl.removeAttribute("class");
  endSubmitButton.addEventListener("click", saveScoreLocalStorage);
}

// This function calculates our quiz score.
function calculateScore() {
  var gradePercentage = (correctQuestions / questions.length) * 100;
  finalScore = gradePercentage + "%";
  endScoreEl.textContent = finalScore;
  return finalScore;
}

// This function runs our timer when our quiz starts.
function startTimer() {
  timerCount = 30;
  timerElement.textContent = timerCount;
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount <= 0) {
      timerElement.setAttribute("style", "color: #cc0000;");
      timerElement.textContent = "Times Up!";
      masterQuestionIndex = questions.length;
      timerCount = 0;
      clearInterval(timer);
      finishedQuiz();
    }
  }, 1000);
  return;
}

// This function prevents the our choices from loading in the same order.
// The Fisher-Yates shuffle algorithm.
function shuffle(array) {
  var m = array.length,
    t,
    i;
  // While there remain elements to shuffle.
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// This function will render and cycle through our questions.
function renderQuestion() {
  // Choose a Question from our Master Questions Array
  let q = questions[masterQuestionIndex];

  // Creates and appends our <p> element to display our Right or Wrong message.
  var messagePEl = document.createElement("p");
  messageEl.appendChild(messagePEl);

  // Creates and appends our new container that will hold our rendered choices.
  var qAnswerDivEl = document.createElement("div");
  qAnswerEl.appendChild(qAnswerDivEl);

  // Shuffles our choices in a unique order.
  shuffle(q.choices);

  // Appends the current question to the title header.
  qTitleEl.textContent = q.question;

  // Selects our choices, creates a button, appends them to our previously created element.
  for (var i = 0; i < q.choices.length; i++) {
    var choiceSample = q.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("value", choiceSample);
    choiceButton.textContent = choiceSample;
    qAnswerDivEl.appendChild(choiceButton);
  }

  // If timer reaches 0 or is less than 0 our quiz ends.
  if (timerCount <= 0) {
    qAnswerEl.removeChild(qAnswerDivEl);
    messageEl.removeChild(messagePEl);
    return finishedQuiz();
  }

  // This function listens for a click on our created button choices.
  qAnswerDivEl.addEventListener("click", function (event) {
    element = event.target;

    // If choice is correct: message displayed "Correct!" and tally increases by 1.
    if (element.textContent === q.correct) {
      messagePEl.textContent = message[1];
      correctQuestions++;

      // If choice is incorrect: message displayed "Wrong!" and tally does not increase.
    } else {
      messagePEl.textContent = message[0];
      timerCount = timerCount - 10;
    }

    // If all questions have been exhausted, created elements are removed and quiz ends.
    if (masterQuestionIndex === questions.length - 1) {
      qAnswerEl.removeChild(qAnswerDivEl);
      messageEl.removeChild(messagePEl);
      return finishedQuiz();

      // If there are still questions remaining, created elements are removed and new questions are rendered.
    } else {
      // Messages "Wrong!" and "Correct!" removed after short timer ends.
      function messageTimer() {
        var messageTimerCount = 1;
        messageTimerInterval = setInterval(function () {
          messageTimerCount--;
          if (messageTimerCount === 0) {
            messageEl.removeChild(messagePEl);
            clearInterval(messageTimerInterval);
          }
        }, 500);
      }

      qAnswerEl.removeChild(qAnswerDivEl);

      // Increases our Master Question Holder index by 1 to select new questions and choices.
      masterQuestionIndex++;

      messageTimer();

      // Restarts our function that creates questions and choices.
      renderQuestion();
    }
  });
}

//**********************************************************************
function init() {
  if (startButton === null) {
    renderScores();
  } else {
    startButton.addEventListener("click", startQuiz);
  }
}

init();
