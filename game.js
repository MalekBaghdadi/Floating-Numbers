let totalSum = 0;
let gameStarted = false;
let minNumber = 1; // Default min num
let maxNumber = 100; // Default max num
let numberOfNumbers = 10; // Default quantity of numbers spawned
let overallDuration = 15; // Default spawn interval in ms

$(document).ready(function () {
    showStartButton();

    $('#toggle-settings').click(function () {
        $('#settings').toggleClass('hidden');
    });

    $('#applySettings').click(function () {
        minNumber = parseInt($('#minNumber').val()) || 1;
        maxNumber = parseInt($('#maxNumber').val()) || 100;
        numberOfNumbers = parseInt($('#numberOfNumbers').val()) || 10;
        overallDuration = parseInt($('#overallDuration').val()) || 15;
        $('#settings').addClass('hidden');
    });
});

function showStartButton() {
    const guessBox = $('.guess-box');
    guessBox.html(`
        <button id="startGameButton">Start Game</button>
    `);
    $('#startGameButton').click(function () {
        if (!gameStarted) {
            startGame();
            gameStarted = true;
            $('#title').text("Game Started! Add the Numbers!");
            $(this).remove();
        }
    });
}

function startGame() {
    totalSum = 0;
    $('.floating-number').remove();
    for (let i = 0; i < numberOfNumbers; i++) {
        setTimeout(function () {
            const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
            totalSum += randomNumber;
            createFloatingNumber(randomNumber);
        }, i * (overallDuration * 1000 / numberOfNumbers));
    }
    setTimeout(openGuessBox, overallDuration * 1000 + 4000);
}

function createFloatingNumber(number) {
    const numberDiv = $('<div class="floating-number"></div>');
    const randomTop = Math.random() * 60 + 20; // Adjusted range
    const randomDuration = Math.random() * 5 + 5;
    numberDiv.text(number);
    numberDiv.css({
        top: `${randomTop}%`,
        left: '-10rem',
    });

    $('body').append(numberDiv);

    numberDiv.animate({ left: '120vw' }, randomDuration * 1000, 'linear', function () {
        $(this).remove();
    });
}

function openGuessBox() {
    const guessBox = $('.guess-box');
    guessBox.html(`
        <input type="number" id="guess" placeholder="Enter your guess" />
        <button id="submitGuess">Submit</button>
    `);
    $('#submitGuess').click(function () {
        const userGuess = parseInt($('#guess').val());
        if (isNaN(userGuess)) {
            $('.guess-box').append('<p>Please enter a valid number.</p>');
            return;
        }
        checkGuess(userGuess);
    });
}

function checkGuess(userGuess) {
    const guessBox = $('.guess-box');
    if (userGuess === totalSum) {
        guessBox.html(`
            <p>Correct! The sum was ${totalSum}</p>
            <button id="restartGame">Restart Game</button>
        `);
    } else {
        guessBox.html(`
            <p id="answer">Incorrect! The sum was ${totalSum}</p>
            <button id="restartGame">Restart Game</button>
        `);
    }
    $('#restartGame').click(function () {
        resetGame();
    });
}

function resetGame() {
    totalSum = 0;
    $('.floating-number').fadeOut(500, function () {
        $(this).remove();
    });
    $('.guess-box').html('');
    $('#title').text('Press the button to start again');
    gameStarted = false;
    showStartButton();
}


$(".cloud").each(function (index) {  //cloud animation
  const randomTop = Math.random() * 80;
  const randomDuration = Math.random() * 20 + 20;
  let randomDelay = Math.random() * 15 + 15;
  if (index === 0) {
    randomDelay = 0;
  }
  $(this).css({
    top: `${randomTop}px`,
    animationDuration: `${randomDuration}s`,
    animationDelay: `${randomDelay}s`,
  });
});
