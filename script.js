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
var endScoreEl = document.getElementById("score");
var endInputEl = document.getElementById("initials");
var endSubmitButton = document.getElementById("submit-button");

// Targets our elements that will display on the next page.
var scoreDivEl = document.getElementById("score-ul");
var clearScore = document.getElementById("clear-scores");
var goBack = document.getElementById("go-back");

// Targets our element that will display our timer.
var timerElement = document.querySelector("#timer-count");

// Sets our timer count and our timer in a later function.
var timerCount;
var timer;

// Sets value of user's final score in a later function.
var finalScore;

// Create empty array that will hold our save progress in local storage.
var plays = [];

// Variable will save our final score and initials.
var savePlay;

// This function saves user's initials and final percentage score.
function saveUserInput() {
  var userInitals = endInputEl.value.trim();
  savePlay = userInitals + " - " + finalScore;
  saveLocal();
  return savePlay;
}

// This function pushes our score to the plays array and saves it in local storage before loading next page.
function saveLocal() {
  plays.push(savePlay);
  localStorage.setItem("plays", JSON.stringify(plays));
  location.replace("./highscores.html");
  createScoreList();
}

// This function renders the Highscore list to check your progress.
function createScoreList() {
  // Creates and appends an unordered list to our score container.
  var scoreUlEl = document.createElement("ul");
  scoreDivEl.appendChild(scoreUlEl);

  // With this we retrieve our saved data from local storage.
  var storedPlays = JSON.parse(localStorage.getItem("plays"));

  // This will create a list depending on the amount of scores we have saved.
  for (var i = 0; i < storedPlays.length; i++) {
    var createList = storedPlays[i];
    var scoreLi = document.createElement("li");
    scoreLi.textContent = createList;
    scoreLi.setAttribute("data-index", i);
    scoreUlEl.appendChild(scoreLi);
  }

  // When we click on go back we will return to the main page.
  goBack.addEventListener("click", function () {
    location.replace("./index.html");
  });

  // When we click on clear score our list items are deleted and local storage is cleared.
  clearScore.addEventListener("click", function () {
    scoreDivEl.removeChild(scoreUlEl);
    localStorage.clear();
  });
  return;
}

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
  endSubmitButton.addEventListener("click", saveUserInput);
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

function init() {
  var storedPlays = JSON.parse(localStorage.getItem("plays"));

  if (storedPlays !== null) {
    plays = storedPlays;
    console.log(plays);
  }

  if (startButton === null) {
    createScoreList();
  } else {
    startButton.addEventListener("click", startQuiz);
  }
}

init();
