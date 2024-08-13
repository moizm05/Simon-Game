var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userPattern = [];
var level = 0;
var index = 0;

function checkAnswer(index1){
    if(userPattern[index1] != gamePattern[index1]){
        $("h1").css({"font-size": "5rem"});
        $("#game").addClass("hide");
        $(".start-container").removeClass("hide");
        $(".start").text("Play Again")
        $(".rules-button-container").removeClass("hide");
        $("h1").removeClass("text").addClass("starting-h1");
        $("h1").html("Sim<img src='game-logo.png' class='logo'/>n Game");
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

    for(let i = 0; i < gamePattern.length; i++){
        let colour = $("#"+gamePattern[i]);
        setTimeout(function(){
            playSound(gamePattern[i]);
            colour.fadeOut(150).fadeIn(150);
        },300*i);
    }
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
});

$(".start").click(function(event){
    $("#game").removeClass("hide");
    $(".start-container").addClass("hide");
    $(".rules-button-container").addClass("hide");
    $("h1").removeClass("starting-h1").addClass("text");
    nextSequence();
    $("h1").css({"font-size": "3rem"});
    $("h1").text("Level " + level);
});

$(".rules-button").click(function(event){
    $(".start-container").addClass("hide");
    $(".rules-button-container").addClass("hide");
    $(".modal").removeClass("hide");
});

$(".close-button").click(function(event){
    $(".modal").addClass("hide");
    $(".start-container").removeClass("hide");
    $(".rules-button-container").removeClass("hide");
});
