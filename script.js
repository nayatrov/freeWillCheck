var model = {};
var totalGuesses = 0;
var correctGuesses = 0;

function updateModelF(color) {
  return function () {
    var fg = model[color];
    if (!fg) {
      model[color] = { red: 0, blue: 0 };
    }
    model[color][color] += 1;
  };
}

function predictNextColor() {
  var m = model['red'];
  if (!m || m.red === 0) {
    return 'red';
  }
  if (m.blue > m.red) {
    return 'blue';
  }
  return 'red';
}

function updatePercentage() {
  var percentage = (correctGuesses / totalGuesses) * 100;
  document.getElementById('correct-percentage').textContent = percentage.toFixed(2);
  document.getElementById('total-guesses').textContent = totalGuesses;
  var freeWillRating = 100 - Math.abs(percentage - 50) * 2;
  document.getElementById('free-will-rating').textContent = freeWillRating.toFixed(2);
}

function predict(color) {
  // predict next value
  var prediction = predictNextColor();

  // make a function to update the model after the user's choice
  var updateModel = updateModelF(color);

  // update the model with the user's choice
  updateModel();

  // update guess statistics
  if (prediction === color) {
    correctGuesses++;
  }
  totalGuesses++;

  // update correct prediction percentage, total guesses, and free will rating
  updatePercentage();
}

var redButton = document.getElementById('red-button');
var blueButton = document.getElementById('blue-button');

redButton.addEventListener('click', function() {
  predict('red');
});

blueButton.addEventListener('click', function() {
  predict('blue');
});
