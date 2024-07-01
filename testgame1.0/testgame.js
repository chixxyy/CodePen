let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const userGuess = Number(document.getElementById('guessInput').value);
    const message = document.getElementById('message');
    attempts++;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the number in ${attempts} attempts. The number was ${randomNumber}.`;
        message.style.color = 'green';
        resetGame();
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
        message.style.color = 'red';
    } else {
        message.textContent = 'Too low! Try again.';
        message.style.color = 'red';
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    setTimeout(() => {
        document.getElementById('message').textContent = '';
    }, 5000);
}
