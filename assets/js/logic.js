var currentQuestionIndex = 0;
var correctAnswers = 0
var time = 60;
var timerInterval;

//Timer function

function setTime() {
  var timerInterval = setInterval(function() {
    time--;
    document.getElementById('time').textContent = time;

    if(time === 0) {
      clearInterval(timerInterval);
      showEndScreen();
    }
  }, 1000);
}

// Event listener for start button click
document.getElementById('start').addEventListener('click', function () {
    setTime()
    showQuestions()
  });

//Function to show questions

function showQuestions() {
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('questions').classList.remove('hide');

    var questionTitleElement = document.getElementById('question-title');
    var choicesElement = document.getElementById('choices');
    var currentQuestion = questions[currentQuestionIndex];
    questionTitleElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        var choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', function () {
            checkAnswer(choice);
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestions();
              } else {
                showEndScreen();
              }
        });
        choicesElement.appendChild(choiceButton);
    });
  }

// Function to track correct answers

function checkAnswer(userChoice) {
    var currentQuestion = questions[currentQuestionIndex];
    if (userChoice === currentQuestion.correctAnswer) {
      correctAnswers++
    } else {
      time -= 10;
    }
}

// Function to show end screen

  function showEndScreen() {
    clearInterval(timerInterval);
    document.getElementById('questions').classList.add('hide');
    var endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('hide');
    document.getElementById('final-score').textContent = correctAnswers;
    document.getElementById('time').textContent = 0;
  }

// Event listener for submit score button

var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function() {
    var initials = document.getElementById('initials').value;

    if (initials.trim() === '') {
        alert('Please enter valid initials');
        return;
    }

    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var scoreData = {
        initials: initials,
        score: correctAnswers,
    };
    highScores.push(scoreData);

    //Sorting high-scores to fix order

    highScores.sort(function (a,b) {
        return b.score - a.score;
    });
 
    localStorage.setItem('highScores',JSON.stringify(highScores));

    window.location.href = "highscores.html";
});