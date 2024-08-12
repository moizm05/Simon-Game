var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userPattern = [];
var level = 0;
var index = 0;

function checkAnswer(index1){
    if(userPattern[index1] != gamePattern[index1]){
        $("h1").css({"font-size": "2.3rem"});
        $("h1").text("Game Over! Press Any Key To Restart")
        $(document.body).addClass("game-over");
        setTimeout(function(){
            $(document.body).removeClass("game-over");
        },300);
        startOver();
        return;
    }
    if(userPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
}

function playSound(name){
    var randomAudio = new Audio("sounds/"+name+".mp3");
    randomAudio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function nextSequence(){
    level++;
    $("h1").text("Level " + level);

    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    var colour = $("#"+randomChosenColour);
    colour.fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    index = 0;
    userPattern = [];
}

$(".btn").click(function(){
    var chosenColour = $(this).attr("id");
    userPattern.push(chosenColour);
    playSound(chosenColour);
    animatePress(chosenColour);
    checkAnswer(index);
    index++;
})

$(document).keydown(function(event){
    nextSequence();
    $("h1").css({"font-size": "3rem"});
    $("h1").text("Level " + level);
})