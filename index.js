var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).ready(function () {
  $("#overlay").fadeIn(1000);
});

$(document).on("click", function () {
  if (!started) {
    $("#overlay").fadeOut(1000);
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over!<br>Click Anywhere to Restart.");

    $(document).off("click"); // Disable click event until game is restarted

    setTimeout(function () {
      $("body").removeClass("game-over");
      $(document).on("click", restartGame); // Enable click event to restart the game
    }, 20);
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // Delay the next sequence by 1.5 seconds on level 1
  var delay = level === 1 ? 1500 : 0;

  setTimeout(function () {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour);
  }, delay);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

  $("#" + currentColor)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function restartGame() {
  level = 0;
  gamePattern = [];
  started = false;
  $(document).off("click");
  $(document).on("click", function () {
    if (!started) {
      $("#overlay").fadeOut(1000);
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}
