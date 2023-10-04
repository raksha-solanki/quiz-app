const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAanswers = 0;
let attempt = 0;

function setAvailableQuestion(){
    const totalQuestion = quiz.length;
     for(let i=0;i<totalQuestion;i++){
        availableQuestion.push(quiz[i])
     }
    //  console.log(availableQuestion)
}
function getNewQuestion(){
    questionNumber.innerHTML = "Question" +  (questionCounter + 1) + "of" + quiz.length;
    const questionIndex = availableQuestion[Math.floor(Math.random()*availableQuestion.length)];
    currentQuestion = questionIndex;
    console.log(currentQuestion);
    questionText.innerHTML = currentQuestion.q;
    // console.log(questionIndex);
    const index1 = availableQuestion.indexOf(questionIndex);
    availableQuestion.splice(index1,1);
    // console.log(index1);
    // console.log(questionIndex);
    // console.log(availableQuestion);
    const optionLen = currentQuestion.options.length
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = ' ';
    let animationDelay = 0.2;
    for(let i=0; i<optionLen; i++){
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2, 1);
        // console.log(optonIndex);
        // console.log(availableOptions);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay+'s';
        animationDelay = animationDelay + 0.15;
        option.className ="option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    // options
    // console.log(currentQuestion.options);
    // console.log(availableOptions);
    questionCounter++
}


function getResult(element){
    // yeh option ka index btata h jese hi option pr click krte h to****** 
    // console.log(element.id);
    // console.log(element.innerHTML)

    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        // console.log("answer is correct")
        // set the color to the correct option
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAanswers++;
        console.log("correct"+ correctAanswers)
    }
    else{
        // console.log("answer is incorrect")
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }

    }
    attempt++;
    unclikableOptions();

}

function unclikableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0;i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".tottal-question").innerHTML = quiz.length;
    resultBox.querySelector(".tottal-attempt").innerHTML = attempt;
    resultBox.querySelector(".tottal-correct").innerHTML = correctAanswers;
    resultBox.querySelector(".tottal-wrong").innerHTML = attempt-correctAanswers;
    const percentage = (correctAanswers/quiz.length)*100;
    resultBox.querySelector(".tottal-percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".tottal-score").innerHTML = correctAanswers + " / " +quiz.length;
}

function resetQuiz(){
     questionCounter = 0;
     correctAanswers = 0;
     attempt = 0;
    
}

function tryAgainQuiz(){
    // hide the resultbox
    resultBox.classList.add("hide");
    // show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

// starting point
 function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailableQuestion();
    getNewQuestion();
    answerIndicator();
}
