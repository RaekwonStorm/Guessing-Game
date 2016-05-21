/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {
var playersGuess = 0;
var winningNumber = generateWinningNumber();
var guessCounter = 5;
var previousGuesses = [];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	var winner = Math.floor((Math.random() * 100)+1);
	console.log(winner);
	return winner;
}

// Fetch the Players Guess

function playersGuessSubmission(e){
	if (guessCounter === 0) {
		$('h3').html("Sorry, you're all out of guesses!");
		$('.try').css('display', 'none');
		$('h4').css('display','none');
		return;
	}
	if (e.which !== 13 && e.type !== "click") {
		return;
	}
	console.log("clicked")
	playersGuess = +$('#guess').val();
	console.log(playersGuess);
	var checked = checkGuess();
	if (checked !== "already guessed") {
		previousGuesses.push(playersGuess);
	}
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess < winningNumber) {
		$('h4').html("Your number is less than the winning number.");
		return "Your guess was less than the winning number.";
	} else if (playersGuess > winningNumber) {
		$('h4').html("Your guess is higher than the winning number.");
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if (playersGuess > 100 || playersGuess < 1) {
		alert("Please pick a number between 1-100.");
		return;
	}
	else if (playersGuess === winningNumber) {
		$('h3').html('You got the correct number!');
		$('.try').css('display', 'none');
		$('h4').css('display','none');
	} else if (previousGuesses.indexOf(playersGuess) !== -1) {
		$('h3').html('You already guessed that!');
		return "already guessed";
	} else {
		guessCounter--;
		$('h3').html('Wrong! You have '+guessCounter+' Guesses Remaining');
		lowerOrHigher();
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	if (playersGuess === 0) {
		alert("Guess at least once before asking for a hint!")
	} else if (Math.abs(playersGuess - winningNumber) <= 5) {
		alert("You're within 5 of the winning number.");
	} else if (Math.abs(playersGuess-winningNumber) <=15) {
		alert("You're within 15 of the winning number.");
	} else if (Math.abs(playersGuess-winningNumber) <=30) {
		alert("You're within 30 of the winning number.");
	} else {
		alert("You're more than 30 away from the winning number.")
	}
}

// Allow the "Player" to Play Again

function playAgain(){
	guessCounter = 5;
	playersGuess = 0;
	previousGuesses = [];
	winningNumber = generateWinningNumber();
	$('.try').css('display', 'block');
	$('h3').html('5 Guesses Remaining');
}


/* **** Event Listeners/Handlers ****  */
$('.try').click(playersGuessSubmission);
$('#replay').click(playAgain);
$('.box').keypress(playersGuessSubmission);
$('#hint').click(provideHint);
$("#answer").click(function () {
	alert("That'd be too easy! Just play the game.");
});
});
