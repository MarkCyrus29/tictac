const button1 = document.querySelector(".js-button1");
const button2 = document.querySelector(".js-button2");
const button3 = document.querySelector(".js-button3");
const button4 = document.querySelector(".js-button4");
const button5 = document.querySelector(".js-button5");
const button6 = document.querySelector(".js-button6");
const button7 = document.querySelector(".js-button7");
const button8 = document.querySelector(".js-button8");
const button9 = document.querySelector(".js-button9");

const buttonArr = [
  button1,
  button2,
  button3,
  button4,
  button5,
  button6,
  button7,
  button8,
  button9,
];
let playGameCounter = 0;

let scores = JSON.parse(localStorage.getItem("scores")) || {
  xWins: 0,
  oWins: 0,
  draw: 0,
};
console.log("Initial score:", scores);

renderWinCounter();

function playGame(buttonPressed) {
  playGameCounter++;

  buttonArr.forEach((button) => {
    if (button === buttonPressed) {
      matchingButton = button;
      //cannot put x or o on meron na
      if (
        matchingButton.innerHTML === "X" ||
        matchingButton.innerHTML === "O"
      ) {
        playGameCounter--;
      } else {
        //change the first button to be pressed to X
        if (playGameCounter % 2 === 1) {
          matchingButton.innerHTML = "X";
        } //second one to O, and so on
        else {
          matchingButton.innerHTML = "O";
        }
      }
    }
  });
  //3 in a row to win
  if (checkResult() === "win") {
    if (playGameCounter % 2 === 1) {
      renderWinCounter("X");
    } else {
      renderWinCounter("O");
    }
    resetGame();
  }
  if (playGameCounter === 9) {
    renderWinCounter("draw");
    resetGame();
  }
}

function resetGame() {
  buttonArr.forEach((button) => {
    //reset the HTML after winning
    button.innerHTML = "";
  });
  //reset the playGameCounter
  playGameCounter = 0;
}

function checkResult() {
  if (
    (button1.innerHTML === "X" &&
      button2.innerHTML === "X" &&
      button3.innerHTML === "X") ||
    (button1.innerHTML === "O" &&
      button2.innerHTML === "O" &&
      button3.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button4.innerHTML === "X" &&
      button5.innerHTML === "X" &&
      button6.innerHTML === "X") ||
    (button4.innerHTML === "O" &&
      button5.innerHTML === "O" &&
      button6.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button7.innerHTML === "X" &&
      button8.innerHTML === "X" &&
      button9.innerHTML === "X") ||
    (button7.innerHTML === "O" &&
      button8.innerHTML === "O" &&
      button9.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button1.innerHTML === "X" &&
      button4.innerHTML === "X" &&
      button7.innerHTML === "X") ||
    (button1.innerHTML === "O" &&
      button4.innerHTML === "O" &&
      button7.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button2.innerHTML === "X" &&
      button5.innerHTML === "X" &&
      button8.innerHTML === "X") ||
    (button2.innerHTML === "O" &&
      button5.innerHTML === "O" &&
      button8.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button3.innerHTML === "X" &&
      button6.innerHTML === "X" &&
      button9.innerHTML === "X") ||
    (button3.innerHTML === "O" &&
      button6.innerHTML === "O" &&
      button9.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button1.innerHTML === "X" &&
      button5.innerHTML === "X" &&
      button9.innerHTML === "X") ||
    (button1.innerHTML === "O" &&
      button5.innerHTML === "O" &&
      button9.innerHTML === "O")
  ) {
    return "win";
  } else if (
    (button3.innerHTML === "X" &&
      button5.innerHTML === "X" &&
      button7.innerHTML === "X") ||
    (button3.innerHTML === "O" &&
      button5.innerHTML === "O" &&
      button7.innerHTML === "O")
  ) {
    return "win";
  }
}

//make a win counter and play counter
function renderWinCounter(winner) {
  if (winner === "X") {
    scores.xWins += 1;
  } else if (winner === "O") {
    scores.oWins += 1;
  } else if (winner === "draw") {
    scores.draw++;
  }

  localStorage.setItem("scores", JSON.stringify(scores));

  const extrasContainer = document.querySelector(".js-extras");
  extrasContainer.innerHTML = `
  <p>X wins: ${scores.xWins}</p>
  <p>O wins: ${scores.oWins}</p>
  <p>Draws: ${scores.draw}</p>`;
}

//reset button for score
const resetButtonElement = document.querySelector(".js-reset-button");
resetButtonElement.addEventListener("click", () => {
  scores.xWins = 0;
  scores.oWins = 0;
  scores.draw = 0;
  localStorage.removeItem("scores");
  renderWinCounter();
});
