let totalSum = 0;
let gameStarted = false;

$(document).ready(function () {
  $(document).on("keydown touchstart", function () {
    if (!gameStarted) {
      gameStarted = true;
      $("#title").text("Game Started! Add the Numbers!");
      startGame();
    }
  });
});

function startGame() {
  for (let i = 0; i < 10; i++) { 
    setTimeout(function () {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      totalSum += randomNumber;
      createFloatingNumber(randomNumber);
    }, i * 2000);
  }
  setTimeout(openGuessBox, 12000);
}

function createFloatingNumber(number) {
  const numberDiv = $('<div class="floating-number"></div>');
  const randomTop = Math.random() * 80;
  const randomDuration = Math.random() * 5 + 5;
  numberDiv.text(number);
  numberDiv.css({
    top: `${randomTop}%`,
    left: '-10rem',
  });

  $('body').append(numberDiv); // Append to the body

  numberDiv.animate({ left: '120vw' }, randomDuration * 1000, 'linear', function () {
    $(this).remove(); // Remove the number div once it moves out of the screen
  });
}


function openGuessBox() {
  const guessBox = $('.guess-box');
  guessBox.html(`
    <input type="number" id="guess" placeholder="Enter your guess" />
    <button id="submitGuess">Submit</button>
  `);
  $('body').append(guessBox);
  $('#submitGuess').click(function () {
    const userGuess = parseInt($('guess').val());
    checkGuess(userGuess);
  });
}

function checkGuess(userGuess) {
  if(userGuess === totalSum) {
    alert('Correct');
  } else {
    alert(`Incorrect the Sum is ${totalSum}`);
  }
  resetGame();
}

function resetGame() {
  totalSum = 0;
  $('.floating-number').remove();
  $('body').append('<div class="floating-number"></div>');
  $('.guess-box').remove();
  $('body').append('<div class="guess-box"></div>');
  $('#title').text('Press Any Key or touch to Start Again');
  gameStarted = false;
}


$(document).ready(function () { //cloud animation
  $(".cloud").each(function () {
    const randomTop = Math.random() * 80;
    const randomDuration = Math.random() * 40 + 80;
    let randomDelay = 0;
    if (index === 1) {
      randomDelay = Math.random() * 20 + 20;
    } else if (index === 2) {
      randomDelay = Math.random() * 20 + 30;
    }
    $(this).css({
      top: `${randomTop}px`,
      animationDuration: `${randomDuration}s`,
      animationDelay: `${randomDelay}s`,
    });
  });
});
