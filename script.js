//create array objects to store questions
var quizArray = [
    {
        question: 'What does HTML stand for?',
        choices: ['Hyperlinks and Text Markup Language', 
                'Home Tool Markup Language', 'Hyper Text Markup Language'],
        answer: 2
    },
    {
        question: 'Who is making the Web standards?',
        choices: ['Microsoft','Google', 'The World Wide Web Consortium','Mozilla'],
        answer: 2
    },
    {
        question: 'Choose the correct HTML element for the largest heading:',
        choices: ['h6','head', 'heading','h1'],
        answer: 3
    },
    {
        question: 'What is the correct HTML element for inserting a line break?',
        choices: ['break','br', 'lb'],
        answer: 1
    },
    {
        question: 'What is the correct HTML for creating a hyperlink?',
        choices: ['href="https://www.example.com','name="https://www.example.com', 
                    'url="https://www.example.com','https://www.example.com'],
        answer: 0
    }

]

//DOM for homepage and quiz-page
var homepage = document.querySelector(".homepage");
var startBtn = document.querySelector('#start-btn')
var quizpageEl = document.querySelector('.quiz-page');
//DOM for gameover-page
var gameOverPageEl = document.querySelector('.gameover-page');
var finalScoreEl = document.querySelector('#final-score')
var initialsEl = document.querySelector('#initials-input')
var submitBtn = document.querySelector('#submit-btn')
//DOM for score page
var scorePageEl = document.querySelector('.score-page')
var scoreEl = document.querySelector('.score-list')
var backBtn = document.querySelector('#back-btn')
var clearBtn = document.querySelector('#clear-btn')

var timerEl = document.querySelector('#time')

var questionCounter = 0;
var setTime;
var secondsLeft = 100;

//timer 
timerEl.innerHTML = secondsLeft
function timer() {
        setTime = setInterval(function() {
        secondsLeft--;
        timerEl.innerHTML = secondsLeft
        if(secondsLeft === 0){
            clearInterval(setTime);
            gameOver();
        }

    }, 1000);
  }

  var currentQuestion;
  
//generate questions and choices
function getQuestion(){
    quizpageEl.innerHTML = '';
    currentQuestion = quizArray[questionCounter]
    var createQuestion = document.createElement("h3")
    createQuestion.innerHTML = currentQuestion.question;
    quizpageEl.appendChild(createQuestion);
    console.log(createQuestion)
    
    var choiceLen = currentQuestion.choices.length;
    for(var i = 0; i < choiceLen; i++){
        var answerChoices = document.createElement("button");
        answerChoices.className = `choice-btn`
        answerChoices.setAttribute('number', i)
        answerChoices.innerHTML = `${i+1}. ${currentQuestion.choices[i]}`;
        quizpageEl.appendChild(answerChoices)
        const lineBr = document.createElement("br");
        quizpageEl.appendChild(lineBr)
    }
    
    questionCounter++;
    console.log(answerChoices)
}

//game over page will display
function gameOver(){
    hide(quizpageEl)
    show(gameOverPageEl)
    finalScoreEl.innerHTML = secondsLeft;
  
}
//create lists[], and add <li> to the array
var lists = []


function appendPerson(){
    scoreEl.innerHTML = '';
    initialsEl.value = ''
    for(var i = 0; i<lists.length; i++){
        var list = lists[i]
        var li = document.createElement('li')
        li.innerHTML =`${i+1}. ${list.initial}    ${list.score}`
        lists.sort(function(a, b){
            return b.score - a.score;
        })
        // li.setAttribute("number", i); 
        scoreEl.appendChild(li)      
    }
    
    localStorage.setItem("lists", JSON.stringify(lists))
}
//set and get localStorage
function pullScore(){
    var storedList = JSON.parse(localStorage.getItem("lists"))
    if(storedList !== null){
        lists = storedList;

    }
    else{
        return;
    }
    appendPerson()
}
// create show and hide function to easily hide page
function show(page){

    if(page.style.display === "none"){
        page.style.display = "block";
    }
}
function hide(page){
    if(page.style.display === "block"){
        page.style.display = "none";
    }
}

//click view highscores
function viewHighscores(){
    var viewHighscores = document.querySelector('#show-last-score')
    viewHighscores.addEventListener('click', function(event){
        event.preventDefault();
        hide(homepage)
        show(scorePageEl)
        pullScore()
    })//end view
    goBack()
    clear()

}


//start-quiz button function
function startQuiz(){    
    startBtn.addEventListener('click', function(event){
        event.preventDefault();
        timer()
        getQuestion();
        hide(homepage); 
        show(quizpageEl)
        backBtn.style.display = 'none'
        clearBtn.style.display = 'none'
        
        });

}

//to hide the right or wrong message after 2 sec
function hideAfter(){
    var sec = 2;
    var fade = setInterval(function() {
        sec--;
        if(sec === 0){
            clearInterval(fade);
            message.remove()
        }
        console.log(sec)
    }, 1000);
    

}
//to create <p> to display right or wrong
var message;
//answer click function
function chooseAnswer(){
    
    quizpageEl.onclick = function(event){
        event.preventDefault();
        var choice = event.target.getAttribute('number');
        var correctAnswer = currentQuestion.answer 
        var messageText;
        message = document.createElement("p");
        message.className = 'message'
        
        if (event.target.className === 'choice-btn'){
                
            if(questionCounter < quizArray.length){                
                getQuestion();
                hide(scorePageEl)
                
                if(choice == correctAnswer){
                    messageText = 'Right'
                    hideAfter()
                            
                }
                else{
                    secondsLeft -= 10
                    messageText = 'Wrong!'
                    hideAfter()
                    
                }
                message.innerHTML = messageText;
                quizpageEl.appendChild(message)
                
            }
            else{
                if(choice == correctAnswer){
                    messageText = 'Right!'
                    hideAfter()
                            
                }
                else{
                    secondsLeft -= 10
                    messageText = 'Wrong!'
                    hideAfter()
                    
                }
                message.innerHTML = messageText;
                gameOverPageEl.appendChild(message)

                clearInterval(setTime)
                hide(quizpageEl)
                show(gameOverPageEl)
                gameOver();
                hide(scorePageEl)        
            }

       }
    
    
       
    }

}

//submit-button function
function submitResult(){
    submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    var person = {
        initial: initialsEl.value.trim(),
        score: secondsLeft
    }
    if(person.initial == ''){
        alert("Please enter initials: ")

    }
    else{
        
        lists.push(person)
        initialsEl.value =''
        hide(gameOverPageEl)
        appendPerson();
        pullScore()
        show(scorePageEl)
        backBtn.style.display = 'inline'
        clearBtn.style.display = 'inline'
        //reset question
        questionCounter = 0;
        secondsLeft = 100;
        timerEl.innerHTML = `${secondsLeft}`;
    }
    
    
});
}


//back-button function
function goBack(){  
    backBtn.addEventListener('click', function(event){
    event.preventDefault();
    show(homepage)
    hide(scorePageEl)
    hide(quizpageEl)
})
}

//clear highscore-button function
function clear(){ 
    clearBtn.addEventListener('click', function(event){
    event.preventDefault();
    scoreEl.innerHTML = '';
    localStorage.clear();
    lists = []
})
}

//invoke the functions
startQuiz()
chooseAnswer()
submitResult()
viewHighscores()







