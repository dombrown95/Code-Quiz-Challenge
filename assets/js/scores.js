// Code to fix highscores not showing

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var highScoresList = document.getElementById('highscores');

for (var i = 0; i < highScores.length; i++) {
  var scoreEntry = document.createElement('li');
  scoreEntry.textContent = highScores[i].initials + ': ' + highScores[i].score;
  highScoresList.appendChild(scoreEntry);
}

// Code to clear high scores when button is clicked

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
  localStorage.removeItem('highScores');

  highScoresList.innerHTML = '';
});