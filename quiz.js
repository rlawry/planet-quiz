var buttons = [];
var choices = [];
var clicks = 0;

var game = {
    round1:{
        q1:{
            q: "Earth _________ the Sun",
            options: {
                1: "Revolves around",
                2: "Rotates around"
            },
            correct: 1
        },
        q2:{
            q: "The Moon _________ Earth",
            options: {
                1: "Revolves around",
                2: "Rotates around"
            },
            correct: 1
        },
        q3:{
            q: "Earth _________ on its axis",
            options: {
                1: "Revolves",
                2: "Rotates"
            },
            correct: 2
        },
        q4:{
            q: "The Sun appears to move through the sky during the day.",
            options: {
                1: "Earth Revolves around the Sun",
                2: "Earth Rotates on its axis"
            },
            correct: 2
        },
        q5:{
            q: "The constellations are changing each month",
            options: {
                1: "Earth Revolves around the Sun",
                2: "Earth Rotates on its axis"
            },
            correct: 1
        }
    },
    round2:{
        q1:{
            q: "Earth revolves",
            options: {
                1: "Around the Sun",
                2: "On its Axis"
            },
            correct: 1
        },
        q2:{
            q: "The Moon rotates",
            options: {
                1: "Around Earth",
                2: "On its Axis"
            },
            correct: 2
        },
        q3:{
            q: "The stars circle Polaris because Earth...",
            options: {
                1: "Revolves around the Sun",
                2: "Rotates on its Axis"
            },
            correct: 2
        }
    }
}

var round = 1;
var roundRef = "round1";
var question = 1;
var questionRef = "q1";
var roundCorrect = [];
var handicap = 0;
var correct;
var ended = false;
var winCount = 0;
var newCreated = false;

var questionList = [];

function newQuestion(){
    generateQuestion();
    choices = [];
    console.log(`Round ref:${roundRef} questionRef:${questionRef}`);
    let question = game[roundRef][questionRef];
    document.getElementById("question").innerHTML = game[roundRef][questionRef].q;
    for(let element of Object.keys(question.options)){
        choices.push(question.options[element]);
    }
    newCreated = true;
    correct = game[roundRef][questionRef].correct;
    clearButtons();
    buildOptions();
}

function clearButtons(){
    var things = document.querySelectorAll('.btn');
    things.forEach(el => el.remove());
}

function buildOptions(){
    choices.forEach(function(value, i){
        document.getElementById('buttons').innerHTML += `<button class="btn" id="option-${i}" value=${i+1}>${value}</button>`;
    });
    document.querySelectorAll(".btn").forEach(el => el.addEventListener("click", function() {
        checkAnswer(this);
    }));
}

function isRoundComplete(q){
    let t = 0;
    q.forEach(function(item){
        if(item == 1){t+=item;}
    });
    console.log(`${t} t ${q.length} qlength`);
    if(t==q.length){return true;}
    return false;
}

function checkAnswer(e){
    if(!ended){
        clicks++;
        if(e.value==correct){
            document.getElementById("message").innerHTML = "Correct";
            document.getElementById("message").classList.remove("lose-class");
            questionList[question-1] = 1;

            question++;
            questionRef = "q"+question;

            if(isRoundComplete(questionList)){
                console.log("NewRound!");
                round++;
                setRound(round);
            }
            winCount++;
            if(!ended){
                newQuestion();
            }
        }
        else{
            document.getElementById("message").innerHTML = "Nah.";
            document.getElementById("message").classList.add("lose-class");
            newQuestion();
        }
        console.log(questionList + " check answer");
        updatePoints();
    }
    console.log(`Ended=${ended}`);
}

function startGame(){
    setRound(1);
    newQuestion();
}

function updatePoints(){
    document.getElementById("points").innerHTML = winCount;
}



function setRound(r){
    if(gameOver()){
        endGame();
    }
    else{
        round = r;
        roundRef = `round${round}`;
        question = 1;
        questionRef = `q${question}`;
        questionList = [];
        for(let i = 0; i<Object.keys(game[roundRef]).length; i++){
            questionList.push(0);
        }
        document.getElementById("round").innerHTML = `Round ${round}`;
    }
}

function gameOver(){
    let gameLength = Object.keys(game).length+1;
    console.log(`Game length=${gameLength}`);
    if(round == gameLength){return true};
    return false
}

function endGame(){
    ended = true;
    document.getElementById("message").innerHTML = "Game Over.  You did it.";
}

function generateQuestion(){
    let options = [];
    questionList.forEach(function(element,index){
        if(element == 0){options.push(index)};
    });
    questionRef = `q${options[Math.floor(Math.random()*options.length)]+1}`;
    console.log(`questionRef=${questionRef}`);
}