// Contains Questions, Choices and Answers we will use in our quiz.
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

// Master Questions holder index starting point.
var masterQuestionIndex = 0;

// Message Displayed when answer chosen is Right or Wrong.
var message = ["Wrong! ", "Correct! "];

// Selectors for our Three different sections in our card. Questions, Answers and Messages.
var startEl = document.getElementById("start");
// var startTitleEl = document.getElementById("start-title");
// var startMessageEl = document.getElementById("start-message");
var startButton = document.getElementById("start-button");

var questionEl = document.getElementById("questions");
var qTitleEl = document.getElementById("question-title");
var qAnswerEl = document.getElementById("question-answers");

var messageEl = document.getElementById("message");

var endEl = document.getElementById("end");
//**********************************************************************
var endScoreEl = document.getElementById("score");
var endInputEl = document.getElementById("initials");
var endSubmitButton = document.getElementById("submit-button");
//**********************************************************************
var timerElement = document.querySelector("#timer-count");
var timerCount;
var timer;

//****************************************************************************************************

// when all questions are answered or timer reaches 0
// game over
// then i can save initials and score
// local storage
//******************

function startQuiz() {
  startEl.setAttribute("class", "hide");
  questionEl.removeAttribute("class");
  startTimer();
  renderQuestion();
}

function finishedQuiz() {
  questionEl.setAttribute("class", "hide");
  endEl.removeAttribute("class");
}

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

//Fisher–Yates shuffle algorithm - Prevents same multiple choice order.
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

// Renders and cycles through our questions.
function renderQuestion() {
  // Choose a Question from our Master Questions Array
  let q = questions[masterQuestionIndex];

  var messagePEl = document.createElement("p");
  messageEl.appendChild(messagePEl);
  var qAnswerDivEl = document.createElement("div");
  qAnswerEl.appendChild(qAnswerDivEl);

  shuffle(q.choices);

  qTitleEl.textContent = q.question;

  for (var i = 0; i < q.choices.length; i++) {
    var choiceSample = q.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("value", choiceSample);
    choiceButton.textContent = choiceSample;
    qAnswerDivEl.appendChild(choiceButton);
  }

  if (timerCount <= 0) {
    console.log(timerCount);
    return finishedQuiz();
  }

  qAnswerDivEl.addEventListener("click", function (event) {
    element = event.target;

    if (element.textContent === q.correct) {
      messagePEl.textContent = message[1];
    } else {
      messagePEl.textContent = message[0];
      timerCount = timerCount - 10;
    }

    if (masterQuestionIndex === questions.length - 1) {
      qAnswerEl.removeChild(qAnswerDivEl);
      messageEl.removeChild(messagePEl);
      return finishedQuiz();
    } else {
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

      masterQuestionIndex++;
      messageTimer();
      renderQuestion();
    }
  });
}

startButton.addEventListener("click", startQuiz);
