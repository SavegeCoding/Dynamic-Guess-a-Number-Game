const numberInput = document.getElementById("number-input");
const maxNumberInput = document.getElementById("max-number-input");
const guessLimitInput = document.getElementById("guess-limit");
const guessBtn = document.getElementById("guess-btn");
const guessStatusHeading = document.getElementById("guess-status");
const guessesLeftHeading = document.getElementById("guesses-left-heading");
const resetBtn = document.getElementById("reset-btn");

let secretNumberGenerated = false;
let numberGuessed = false;

let guessNumber;
let maxNumber;
let guessesLeft;
let secretNumber;
let NumberOfGuesses = 0;

let numbersGuessed = new Set();
let lowestPossibleNumber;
let highestPossibleNumber;

function validateInput(input) {
    return input.checkValidity() && !Number.isNaN(input.valueAsNumber);
}

function resetGameHelper() {
    guessesLeftHeading.textContent = "";
    secretNumberGenerated = false;
    numberInput.style.border = "";
    maxNumberInput.style.border = "";
    guessLimitInput.style.border = "";
}

function guessSecretNumber() {
    if (guessNumber < secretNumber) {
        guessStatusHeading.textContent = "Too low!";
        lowestPossibleNumber = guessNumber + 1;
    }
    else if (guessNumber > secretNumber) {
        guessStatusHeading.textContent = "Too high!";
        highestPossibleNumber = guessNumber - 1;
    }
    else {
        guessStatusHeading.textContent = `You guessed the secret number in ${NumberOfGuesses} guesses!`;
        numberGuessed = true;
        resetGameHelper();
    }
}

function playGame() {
    if (!validateInput(numberInput) || !validateInput(maxNumberInput) || !validateInput(guessLimitInput)) {
        guessStatusHeading.textContent = "Please make sure there are valid numbers in all the boxes!";
        guessStatusHeading.style.color = "red";
        return;
    }

    guessStatusHeading.style.color = "white";
    guessNumber = numberInput.valueAsNumber;

    if (!secretNumberGenerated) {
        maxNumber = maxNumberInput.valueAsNumber;
        guessesLeft = guessLimitInput.valueAsNumber;
        lowestPossibleNumber = 1;
        highestPossibleNumber = maxNumber;
        NumberOfGuesses = 0;
        numbersGuessed = new Set();
        secretNumber = Math.floor(Math.random() * maxNumber) + 1;
        secretNumberGenerated = true;
        numberGuessed = false;
    }

    if (numbersGuessed.has(guessNumber)) {
        guessStatusHeading.textContent = "You already guessed that number!";
        return;
    } 
    else if (guessNumber < lowestPossibleNumber || guessNumber > highestPossibleNumber) {
        guessStatusHeading.textContent = "It cannot possibly be that number!";
        return;
    }

    if (guessesLeft > 0) {
        guessesLeft--;
        NumberOfGuesses++;
        guessesLeftHeading.textContent = `Guesses left: ${guessesLeft}`;
        numbersGuessed.add(guessNumber);
        guessSecretNumber();
    }

    if (guessesLeft <= 0 && !numberGuessed) {
        guessStatusHeading.textContent = `Game over! The secret number was ${secretNumber}.`;
        resetGameHelper();
    }
}

numberInput.addEventListener("input", () => {
    if (
        (!secretNumberGenerated && validateInput(numberInput) && (numberInput.valueAsNumber <= maxNumberInput.valueAsNumber || Number.isNaN(maxNumberInput.valueAsNumber))) ||
        (validateInput(numberInput) &&
        !numbersGuessed.has(numberInput.valueAsNumber) &&
        numberInput.valueAsNumber >= lowestPossibleNumber &&
        numberInput.valueAsNumber <= highestPossibleNumber)
    ) {
        numberInput.style.border = "";
    }
    else {
        numberInput.style.border = "1vw solid red";
    }
});

maxNumberInput.addEventListener("input", () => {
    if ((!secretNumberGenerated && validateInput(maxNumberInput)) || maxNumberInput.valueAsNumber === maxNumber) {
        maxNumberInput.style.border = "";
    }
    else {
        maxNumberInput.style.border = "1vw solid red";
    }
});

guessLimitInput.addEventListener("input", () => {
    if (!secretNumberGenerated && validateInput(guessLimitInput)) {
        guessLimitInput.style.border = "";
    }
    else {
        guessLimitInput.style.border = "1vw solid red";
    }
});

numberInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        playGame();
    }
})

guessBtn.addEventListener("click", () => {
    playGame();
});

resetBtn.addEventListener("click", () => {
    guessStatusHeading.textContent = "Please enter values in all three boxes";
    resetGameHelper();
});