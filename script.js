// Contains Questions, Choices and Answers we will use in our quiz.
let questions = [{
    question: "Commonly used data types DO NOT include: ",
    choices: ["strings", "booleans", "numbers", "alerts"],
    correct: "alerts"
},
{
    question: "The condition in an if/else statement is enclosed within _____.",
    choices: ["quotes", "parenthesis", "square brackets", "curly brackets"],
    correct: "curly brackets"
},
{
    question: "Arrays in Javascript can be used to store",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: "all of the above"
},
{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    choices: ["JavaScript", "terminal/bash", "for loops", "console log"],
    correct: "console log"
}
];

// Selectors for our Three different sections in our card. Questions, Answers and Messages.
var questionEl = document.querySelector("#questions");
var answerEl = document.querySelector("#answers");
var messageEl = document.querySelector("#message");

// Message Displayed when answer chosen is Right or Wrong.
var message = ["Wrong!", "Correct!"];

// Master Questions holder index starting point. 
var masterQuestionIndex = 0;


var lastQuestionIndex = questions.length - 1;


//*********************************************************************************************************
//Fisher–Yates shuffle algorithm - Prevents same multiple choice order.
function shuffle(array) {
    var m = array.length, t, i;
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
    // Defines and creates Ul Element.
    var ulEl = document.createElement("ul");
    // Defines and creates our Li Elements.
    var liEl = document.createElement("li");
    var liE2 = document.createElement("li");
    var liE3 = document.createElement("li");
    var liE4 = document.createElement("li");
    // Defines and creates our Four Buttons that will be used for our multiple choice questions.
    var button1 = document.createElement("button");
    var button2 = document.createElement("button");
    var button3 = document.createElement("button");
    var button4 = document.createElement("button");
    // Defines and creates our P Elements for our messages.
    var pEl = document.createElement("p");

    // Choose a Question from our Master Questions Array
    let q = questions[masterQuestionIndex];
    questionEl.innerHTML = "<h2>" + q.question + "</h2>";

    // Shuffles our multiple choice questions.
    shuffle(q.choices);

    // Sets our buttons with our shuffled multiple choice questions.
    button1.textContent = q.choices[0];
    button2.textContent = q.choices[1];
    button3.textContent = q.choices[2];
    button4.textContent = q.choices[3];

    // Inject our created elements with their content and style into our HTML
    answerEl.appendChild(ulEl);
    ulEl.setAttribute("style", "list-style-type: none");
    ulEl.appendChild(liEl).appendChild(button1);
    ulEl.appendChild(liE2).appendChild(button2);
    ulEl.appendChild(liE3).appendChild(button3);
    ulEl.appendChild(liE4).appendChild(button4);
    messageEl.appendChild(pEl);

    // Detects what button user will choose.
    ulEl.addEventListener("click", function (event) {
        element = event.target;

        if (element.textContent === q.correct) {
            pEl.textContent = message[1];
            answerEl.removeChild(ulEl);
            masterQuestionIndex++;
            renderQuestion();
        } else {
            pEl.textContent = message[0];
            answerEl.removeChild(ulEl);
            masterQuestionIndex++;
            renderQuestion();
        }

    });


}


//click the start button 
// Timer starts and presented with questions
// answer a question
//presented with another questions
// When i answer the question incorrectly
//subtracted from the clock
// when all questions are answered or timer reaches 0 
// game over
// then i can save initials and score
// local storage

// First function initialized. Starting page. 
function init() {
    // Creates our first header, paragraph and starting button..
    var h2El = document.createElement("h2");
    var pEl = document.createElement("p");
    var button = document.createElement("button");
    // Text within our first header, paragraph and starting button.
    h2El.textContent = "Coding Quiz Challenge";
    pEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    button.textContent = "Start Quiz";
    // Style set to our first header and starting button.
    h2El.setAttribute("style", "text-align: center");
    button.setAttribute("style", "margin: 16px 16px 16px 20px; padding: 14px 80px; text-align: center; width: 39%;");
    // Inject our created elements with their content into our HTML
    questionEl.appendChild(h2El);
    answerEl.appendChild(pEl);
    messageEl.appendChild(button);
    // Detects when user presses on the start button.
    button.addEventListener("click", function() {
        // Removes created elements in preperation for our new elements.
        questionEl.removeChild(h2El);
        answerEl.removeChild(pEl);
        messageEl.removeChild(button);
        // Runs our renderQuestions Function
        return renderQuestion();
    });
}

//Calls our Initialize function to retrieve data and render it to our page when it loads.
init();