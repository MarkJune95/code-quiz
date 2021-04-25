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

//get HTML DOM input
var homepage = document.querySelector(".homepage-box");
var startBtn = document.querySelector('#start-btn')
var questionEl = document.querySelector('.quiz-list');
var scorePageEl = document.querySelector('.score-page')
var scoreEl = document.querySelector('.score-list')
var timerEl = document.querySelector('#time')
var listBtnEl = document.querySelector('.score-page .list-btn')

var questionCounter = 0;
var initialInput;
var setTime;

scorePageEl.style.display = "none"

var secondsLeft = 100;
function timer() {
        setTime = setInterval(function() {
        secondsLeft--;
        timerEl.innerHTML = `Time left: ${secondsLeft}`;
        if(secondsLeft === 0){
            clearInterval(setTime);
            gameOver()
        }

    }, 1000);
  }



//getQuestion function will generate questions
function getQuestion(){
    //clear the page
    questionEl.innerHTML = '';
    //set questions
    var currentQuestion = quizArray[questionCounter]
    //create question
    var createQuestion = document.createElement("h3")
    createQuestion.innerHTML = currentQuestion.question;
    questionEl.appendChild(createQuestion);
    console.log(createQuestion)
    
    // display answer choices
    var choiceLen = currentQuestion.choices.length;
    for(var i = 0; i < choiceLen; i++){
        var answerChoices = document.createElement("button");
        answerChoices.className = 'choice-btn'
        answerChoices.innerHTML = `${i+1}. ${currentQuestion.choices[i]}`;
        questionEl.appendChild(answerChoices)
        const lineBr = document.createElement("br");
        questionEl.appendChild(lineBr)
    }
    
    questionCounter++;
    
}


//gameOver function will display a page for user to see final scores, and enter initials
function gameOver(){
    //clear the page
    questionEl.innerHTML = '';
    const title = document.createElement("h3")
    title.innerHTML = "All done!"
    questionEl.appendChild(title)

    var showScore = document.createElement("p")
    showScore.innerHTML = `Your final score is ${secondsLeft}`
    questionEl.appendChild(showScore)
    
    var label = document.createElement("label")
    label.innerHTML = "Enter your initials: "
    questionEl.appendChild(label)

    initialInput = document.createElement('input')
    initialInput.setAttribute('type', 'text')
    initialInput.id = 'initials'
    // console.log(initialInput)
    questionEl.appendChild(initialInput)
    
    var submitBtn = document.createElement('input')
    submitBtn.setAttribute('type', 'submit')
    submitBtn.setAttribute('value', 'Submit')
    submitBtn.className = 'btn'
    submitBtn.id = 'submit-btn'
    questionEl.appendChild(submitBtn)
  
}
function appendPerson(){

    var highScore = {
        person: initialInput.value,
        score: secondsLeft
    };
    localStorage.setItem("highscore", JSON.stringify(highScore));
    //create list of initials
    // var ol = document.createElement('ol')
    var li = document.createElement('li')
    li.className ="list"
    li.append(highScore.person) + li.append(" - ") + li.append(highScore.score)
    // ol.appendChild(li)
    scoreEl.appendChild(li)
    console.log(li)
}


//click event for starting the quiz
startBtn.addEventListener('click', function(event){
event.preventDefault();
timer()
getQuestion(); 
homepage.style.display = "none";
   
          
});




//click answer button 
questionEl.onclick = function(event){
    event.preventDefault();
    var target = event.target;
    if (target.className === 'choice-btn'){
        if(questionCounter === quizArray.length){
            clearInterval(setTime)
            gameOver(); 
   
        }
        else{
            getQuestion();
                
        }
            
   }
   //submit-button
   if (target.id === 'submit-btn'){
       questionEl.innerHTML = ''
       appendPerson();
       show(scorePageEl)
       secondsLeft = 100;
       timerEl.innerHTML = `Time left: ${secondsLeft}`;
       questionCounter = 0;
       
}
}
//back-button and clear-button click event
scorePageEl.onclick = function(event){
    event.preventDefault();
    target = event.target;
    if(target.id === 'back-btn'){
        
        show(homepage)
        hide(scorePageEl)
        // scoreEl.style.display = "none"
        questionEl.innerHTML = ''   
        
    }
    if(target.id === 'clear-btn'){
        scoreEl.innerHTML = ''
        
    }
    if(scoreEl.innerHTML == ""){
        document.querySelector('#clear-btn').style.display = 'none'
        document.querySelector('#back-btn').style.display = 'none'
    }
    
}

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


