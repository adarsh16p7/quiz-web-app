let quizData = [
    {
        question: "Which supercar manufacturer produces the Chiron, known for its extreme performance and luxury?",
        options: ["Koenigsegg", "Bugatti", "Pagani", "Lamborghini"],
        answer: "Bugatti"
    },
    {
        question: "What is the name of the hypercar produced by Swedish automaker Koenigsegg, known for its innovative engineering and record-breaking speed?",
        options: ["Agera RS", "Venom GT", "LaFerrari", "Rimac C_Two"],
        answer: "Agera RS"
    },
    {
        question: "Which supercar manufacturer produces the 720S and P1 models, both acclaimed for their performance and design?",
        options: ["Ferrari", "McLaren", "Lamborghini", "Porsche"],
        answer: "McLaren"
    },
    {
        question: "What is the name of the limited-production hypercar manufactured by Pagani, known for its exquisite craftsmanship and performance?",
        options: ["Huayra", "Veyron", "Aventador", "LaFerrari"],
        answer: "Huayra"
    },
    {
        question: "Which automaker produces the One:1, a hypercar named for its remarkable 1:1 power-to-weight ratio?",
        options: ["Pagani", "Koenigsegg", "Bugatti", "Ferrari"],
        answer: "Koenigsegg"
    },
    {
        question: "Which Italian automaker produces the Huracan and Aventador models?",
        options: ["Ferrari", "Lamborghini", "Porsche", "Bugatti"],
        answer: "Lamborghini"
    },
    {
        question: "Which supercar manufacturer produced the F1, considered one of the greatest supercars of all time?",
        options: ["Lamborghini", "Ferrari", "McLaren", "Pagani"],
        answer: "McLaren"
    },
    {
        question: "What is the top speed of the Bugatti Veyron Super Sport, one of the fastest production cars in the world?",
        options: ["250 mph", "275 mph", "300 mph", "325 mph"],
        answer: "300 mph"
    },
    {
        question: "Which supercar manufacturer is known for the Veyron, which held the title of the world's fastest production car?",
        options: ["Pagani", "Koenigsegg", "Bugatti", "Ferrari"],
        answer: "Bugatti"
    },
    {
        question: "What is the name of the supercar division of Mercedes-Benz, known for producing high-performance models such as the AMG GT?",
        options: ["Maserati", "Audi Sport", "BMW M", "Mercedes-AMG"],
        answer: "Mercedes-AMG"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 59;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const submitButton = document.getElementById("submit-btn");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click",loadNextQuestion);
submitButton.addEventListener("click",showQuizResults);

displayQuestion();
startTimer();

function updateTimer(){
    if(timeLeft>0){
        const seconds = timeLeft;
        const displaySeconds = seconds<10 ? `0${seconds}` : seconds;
        timerDisplay.textContent = displaySeconds;
        timeLeft--;
    }
    else{
        clearInterval(timer);
        timerDisplay.textContent = "!!!";
        showQuizResults();
    }
}

function startTimer(){
    updateTimer();
    timer = setInterval(updateTimer,1000);
}

function evaluateUserAnswers(){
    let score = 0;
    quizData.forEach((question,index) => {
        console.log(question);
        if(userAnswers[index]===question.answer){
            score += 10;
        }
    });
    return score;
}

function showQuizResults(){
    clearInterval(timer);
    const userScore = evaluateUserAnswers();
    scoreContainer.textContent = `Your Score: ${userScore} out of ${quizData.length*10}`;
}

function loadNextQuestion(){
    if(currentQuestionIndex < quizData.length - 1){
        currentQuestionIndex++;
        displayQuestion();
    }
    else{
        timerDisplay.textContent = "!!!";
        showQuizResults();
    }
}

function selectAnswer(answer){
    const optionButtons = document.querySelectorAll(".quiz-option");
    optionButtons.forEach((button) => button.classList.remove("selected"));
    const selectedOption = optionsContainer.querySelector(
        `.quiz-option[data-option="${answer}"]`
    )
    selectedOption.classList.add("selected");
    userAnswers[currentQuestionIndex] = answer;
}

function displayQuestion(){
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    const optionLetters = ["A","B","C","D"];

    currentQuestion.options.forEach((option,index) => {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("quiz-card");

        const optionLabel = document.createElement("span");
        optionLabel.textContent = optionLetters[index];
        optionLabel.classList.add("option-label");
        optionContainer.appendChild(optionLabel);

        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("quiz-option");
        optionButton.setAttribute("data-option",option);
        optionButton.addEventListener("click",() => selectAnswer(option));
        optionContainer.appendChild(optionButton);
        optionsContainer.appendChild(optionContainer);

    });
}