document.addEventListener("DOMContentLoaded", function(){
    var buttons = document.querySelectorAll(".btn").length;

    for (var i = 0; i < buttons ; i++) {
        document.querySelectorAll(".btn")[i].addEventListener("click", function() {
            checkAnswer(this);
        });
    }
});

var game = {
    round1:{
        q1:{
            q: "Earth _________ the Sun",
            o1: "Revolves around",
            o2: "Rotates around",
            correct: 1
        },
        q2:{
            q: "The Moon _________ Earth",
            o1: "Revolves around",
            o2: "Rotates around",
            correct: 1
        },
        q3:{
            q: "Earth _________ on its axis",
            o1: "Revolves around",
            o2: "Rotates around",
            correct: 2
        },
        q4:{
            q: "Earth _________ on its axis",
            o1: "Revolves",
            o2: "Rotates",
            correct: 2
        },
        q5:{
            q: "Earth _________ on its axis",
            o1: "Revolves around",
            o2: "Rotates around",
            correct: 2
        }
    },
    round2:{
        q1:{
            q: "Pigs",
            o1: "Revolves around",
            o2: "Rotates around",
            correct: 1
        }
    }
}

var round = 1;
var roundRef = "round1";
var question = 1;
var questionRef = "q1";
var roundCorrect = [];
var handicap = 0;

var winCount = 0;
var newCreated = false;

var questionList = [];

function newQuestion(){
    document.getElementById("question").innerHTML = game[roundRef][questionRef].q;
    document.getElementById("option-1").innerHTML = game[roundRef][questionRef].o1;
    document.getElementById("option-2").innerHTML = game[roundRef][questionRef].o2;
    newCreated = true;
}

function isRoundComplete(q,r){
    if(q==r.length){return true;}
    return false;
}

function newRound(r){
    questionList = [];
    for(let i = 0; i<Object.keys(r[roundRef]).length; i++){
        questionList.push(0);
    }
}

function checkAnswer(e){
    console.log(e.value + " value and " + game.round1.q1.correct);
    if(newCreated == true){
        if(e.value==game[roundRef][questionRef].correct){
            document.getElementById("message").innerHTML = "Correct";
            document.getElementById("message").classList.remove("lose-class");
            questionList[question] = 1;
            
            question++;
            questionRef = "q"+question;

            if(isRoundComplete(question,Object.keys(game[roundRef]).length)){
                round++;
                roundRef = "round" + round;
            }
            console.log("yes");
            winCount++;
        }
        else{
            document.getElementById("message").innerHTML = "Nah.";
            document.getElementById("message").classList.add("lose-class");
            newQuestion();
        }
        document.getElementById("points").innerHTML = winCount;
    }
    else if(newCreated == false){
        document.getElementById("message").innerHTML = "You already guessed. Make a new Month.";
    }
}

