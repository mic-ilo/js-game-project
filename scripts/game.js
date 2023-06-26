import { clearGameBoardCanvas, returnHome } from "./game-board.js";
import { createAutoplayLoopAudio, buttonSound } from "./audio.js";
import { blinkImage } from "./animation.js";

const gameBoardStage = document.getElementById("game-board-overlay");

//game function start and pass player 1 and 2 constructor
export function game(player1, player2) {
  //run clear board before loading game;
  clearGameBoardCanvas();

  const gameBoardStageBackgroundContainer = document.createElement("div");
  gameBoardStageBackgroundContainer.classList.add(
    "game-board-background-container"
  );
  gameBoardStage.appendChild(gameBoardStageBackgroundContainer);

  //call player life function
  playerLife(player1, player2, gameBoardStageBackgroundContainer);

  //call elements design function
  elements(gameBoardStageBackgroundContainer);

  //call game characters function
  gameCharacters(gameBoardStageBackgroundContainer);

  //create attack button
  const buttonAttackGameContainer = document.createElement("div");
  buttonAttackGameContainer.classList.add("button-attack-game-container");
  gameBoardStageBackgroundContainer.appendChild(buttonAttackGameContainer);

  let buttonAttackgame = document.createElement("button");
  buttonAttackgame.classList.add("button-attack-game");
  buttonAttackgame.textContent = "FIGHT!!";
  buttonAttackGameContainer.appendChild(buttonAttackgame);

  //event listener for Fight button
  buttonAttackgame.addEventListener("click", () => {
    let playerOneInput = document.getElementById("playerOne-input-id");
    let playerTwoInput = document.getElementById("playerTwo-input-id");

    if (playerOneInput.value === "" || playerTwoInput.value === "") {
      buttonSound("assets/error-sound.mp3");
      //return focus to input 1
      document.getElementById("playerOne-input-id").focus();
    } else {
      buttonSound("assets/punch.mp3");
      //return focus to input1
      document.getElementById("playerOne-input-id").focus();
    }
  });

  buttonAttackgame.addEventListener("click", () => {
    console.log("fight click");
    const playerOneAttack = document.querySelector("#playerOne-input-id");
    let playerOneAttackValue = Number(playerOneAttack.value);
    console.log(playerOneAttackValue);

    const playerTwoAttack = document.querySelector("#playerTwo-input-id");
    let playerTwoAttackValue = playerTwoAttack.value;
    console.log(playerTwoAttackValue);
    console.log("clicked button");

    let result = playerAttackImpact(
      playerOneAttackValue,
      playerTwoAttackValue,
      player1,
      player2,
      gameBoardStageBackgroundContainer
    );

    //Display the attack/ game result on screen
    let displayResultDiv;

    function displayResult(result) {
      displayResultDiv = document.createElement("div");
      displayResultDiv.classList.add("display-result");
      displayResultDiv.innerHTML = `${result}`;
      gameBoardStageBackgroundContainer.appendChild(displayResultDiv);

      //Empty attack values
      playerOneAttack.value = "";
      playerTwoAttack.value = "";

      //empty attack display
      let attackDisplayNote = document.querySelectorAll(
        ".player-attack-display"
      );
      attackDisplayNote.forEach((element) => {
        element.innerHTML = "";
      });

      //Hide the div after 3 seconds
      setTimeout(() => {
        displayResultDiv.style.display = "none";
      }, 6000);
    }

    //call display result for each round conclusion
    displayResult(result);

    //pass who wins function
    whoWins(player1, player2, gameBoardStageBackgroundContainer);
  });

  //restart button
  const restartButtonMidGame = document.createElement("button");
  restartButtonMidGame.classList.add("button-restart-midgame");
  gameBoardStageBackgroundContainer.appendChild(restartButtonMidGame);

  //restart image mid game
  const restartButtonMidGameImage = document.createElement("img");
  restartButtonMidGameImage.setAttribute("src", "assets/restart.png");
  restartButtonMidGameImage.classList.add("restart-button-mid-game-image");
  restartButtonMidGame.appendChild(restartButtonMidGameImage);

  //restartButton event listener for pop up
  restartButtonMidGame.addEventListener("click", () => {
    //call midgame popup function
    midGamePopUp(
      "Do you want to restart the game?",
      gameBoardStageBackgroundContainer,
      confirmYesRestart
    );
  });

  //home button
  const returnHomeMidGame = document.createElement("button");
  returnHomeMidGame.classList.add("return-home-midgame-button");
  gameBoardStageBackgroundContainer.append(returnHomeMidGame);

  //return home image mid game
  const returnHomeMidGameImage = document.createElement("img");
  returnHomeMidGameImage.setAttribute("src", "assets/home.png");
  returnHomeMidGameImage.classList.add("return-home-button-mid-game-image");
  returnHomeMidGame.appendChild(returnHomeMidGameImage);

  //return button event listener pop up
  returnHomeMidGame.addEventListener("click", () => {
    midGamePopUp(
      "Do you want to quit the game?",
      gameBoardStageBackgroundContainer,
      returnHome
    );
  });
}

function confirmYesRestart() {
  backgroundOverlay.style.display = "none";
  backgroundOverlay.style.display = "none";
  playerOneLife = reduceLife(50, 0);
  playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
  playerTwoLife = reduceLife(50, 0);
  playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
}

let backgroundOverlay;

//mid game popup function for restart or return home
function midGamePopUp(
  question,
  gameBoardStageBackgroundContainer,
  actionFunction
) {
  //mid game game pop up
  backgroundOverlay = document.createElement("div");
  backgroundOverlay.classList.add("background-overlay");
  gameBoardStageBackgroundContainer.appendChild(backgroundOverlay);

  const popUpAction = document.createElement("div");
  popUpAction.classList.add("pop-up-action");
  backgroundOverlay.appendChild(popUpAction);

  const clarificationAction = document.createElement("p");
  clarificationAction.classList.add("clarification-action");
  clarificationAction.textContent = question;
  popUpAction.appendChild(clarificationAction);

  const confirmYes = document.createElement("button");
  confirmYes.classList.add("confirm-yes");
  confirmYes.textContent = "Yes";
  popUpAction.appendChild(confirmYes);

  confirmYes.addEventListener("click", () => {
    actionFunction();
    buttonSound("assets/click-button.mp3");
  });

  const confirmNo = document.createElement("button");
  confirmNo.classList.add("confirm-no");
  confirmNo.textContent = "No";
  popUpAction.appendChild(confirmNo);

  confirmNo.addEventListener("click", () => {
    buttonSound("assets/click-button.mp3");
    backgroundOverlay.style.display = "none";
  });
}

//declare in global for easier call in other functions
let playerOneLife = 50;
let playerTwoLife = 50;
let lifeBarContainer = "";
let playerOneLifeBar;
let playerTwoLifeBar;

//playerLife function to initialize each player life battery
function playerLife(player1, player2, gameBoardStageBackgroundContainer) {
  lifeBarContainer = document.createElement("div");
  lifeBarContainer.classList.add("life-bar-container");
  gameBoardStageBackgroundContainer.appendChild(lifeBarContainer);

  //container for player 1
  const playerOneLifeContainer = document.createElement("div");
  playerOneLifeContainer.classList.add("player-life-bar-container");
  lifeBarContainer.appendChild(playerOneLifeContainer);

  playerOneLifeBar = document.createElement("div");
  playerOneLifeBar.classList.add("css-player-life-bar");
  playerOneLifeBar.innerHTML = `${playerOneLife}/50`;
  playerOneLifeContainer.appendChild(playerOneLifeBar);

  const playerOneName = document.createElement("p");
  playerOneName.classList.add("player-name-game");
  playerOneName.innerHTML = `Player 1: ${player1.playerName}`;
  playerOneLifeContainer.appendChild(playerOneName);

  //container for player 2
  const playerTwoLifeContainer = document.createElement("div");
  playerTwoLifeContainer.classList.add("player-life-bar-container");
  lifeBarContainer.appendChild(playerTwoLifeContainer);

  playerTwoLifeBar = document.createElement("div");
  playerTwoLifeBar.classList.add("css-player-life-bar");
  playerTwoLifeBar.innerHTML = `${playerTwoLife}/50`;
  playerTwoLifeContainer.appendChild(playerTwoLifeBar);

  const playerTwoName = document.createElement("p");
  playerTwoName.classList.add("player-name-game");
  playerTwoName.innerHTML = `Player 2: ${player2.playerName}`;
  playerTwoLifeContainer.appendChild(playerTwoName);
}

//elements function
function elements(gameBoardStageBackground) {
  const elements = [
    "assets/air-icon-home.jpg",
    "assets/earth-icon-home.jpg",
    "assets/fire-icon-home.jpg",
    "assets/water-icon-home.jpg",
  ];

  const elementsDiv = document.createElement("div");
  elementsDiv.classList.add("css-game-container");
  gameBoardStageBackground.appendChild(elementsDiv);

  const elementContainer = document.createElement("div");

  elementContainer.classList.add("css-element-container-game");
  elementsDiv.appendChild(elementContainer);

  elements.forEach((element) => {
    const elementItem = document.createElement("img");
    elementItem.setAttribute("src", element);
    elementItem.classList.add("css-elements-item-live-game");
    elementContainer.appendChild(elementItem);
  });
}

//constructor function to track input attack and player input for each player
class InputAttack {
  constructor(container, acceptedInputs, inputId) {
    this.container = container;
    this.acceptedInputs = acceptedInputs;
    this.inputId = inputId;
  }

  //constructor function to track player input of players
  playerInput() {
    const playerInput = document.createElement("input");
    playerInput.classList.add("input-key-game");
    playerInput.setAttribute("type", "password");
    playerInput.setAttribute("maxLength", "1");
    playerInput.setAttribute("id", this.inputId);
    playerInput.addEventListener("input", (event) => {
      acceptedInputs(event, this.acceptedInputs);
    });
    playerInput.setAttribute("placeholder", "type your attack");
    this.container.appendChild(playerInput);
  }
}

//function for game characters. pass gameboardstagebackground container to to append the function here
function gameCharacters(gameBoardStageBackgroundContainer) {
  const charactersContainer = document.createElement("div");
  charactersContainer.classList.add("characters-container");
  gameBoardStageBackgroundContainer.appendChild(charactersContainer);

  //PLAYER ONE
  const playerOneContainer = document.createElement("div");
  playerOneContainer.classList.add("player-one-character-container");
  charactersContainer.appendChild(playerOneContainer);

  const playerOneImage = document.createElement("img");
  playerOneImage.setAttribute("src", "assets/player1.png");
  playerOneImage.classList.add("player-one-image", "player-image");
  playerOneContainer.appendChild(playerOneImage);

  const inputContainerPlayerOne = document.createElement("div");
  inputContainerPlayerOne.classList.add("input-container-player");
  playerOneContainer.appendChild(inputContainerPlayerOne);

  //from constructor used to get playerOne input attack
  const playerOneInput = new InputAttack(
    inputContainerPlayerOne,
    playerOneInputs,
    "playerOne-input-id"
  );
  //call player input constructor function
  playerOneInput.playerInput();

  //player one key guide
  const keysGuidePlayerOne = document.createElement("div");
  keysGuidePlayerOne.classList.add("css-keys-guide");
  keysGuidePlayerOne.innerHTML = `
    <ul>keys Guide
      <li>1 = <span class ='fire-dark'>Fire</span></li>
      <li>2 = <span class ='water-dark'>Water</span></li>
      <li>3 = <span class ='earth-light'>Earth</span></li>
      <li>4 = <span class = 'air-dark'>Air</span></li>
    </ul>
  `;
  playerOneContainer.appendChild(keysGuidePlayerOne);

  //PLAYER TWO
  const playerTwoContainer = document.createElement("div");
  playerTwoContainer.classList.add("player-two-character-container");
  charactersContainer.appendChild(playerTwoContainer);

  const playerTwoImage = document.createElement("img");
  playerTwoImage.setAttribute("src", "assets/player2.png");
  playerTwoImage.classList.add("player-two-image", "player-image");
  playerTwoContainer.appendChild(playerTwoImage);

  const inputContainerPlayerTwo = document.createElement("div");
  inputContainerPlayerTwo.classList.add("input-container-player");
  playerTwoContainer.appendChild(inputContainerPlayerTwo);

  const playerTwoInput = new InputAttack(
    playerTwoContainer,
    playerTwoInputs,
    "playerTwo-input-id"
  );
  //call player 2 input constructor function
  playerTwoInput.playerInput();

  //key guide for player two
  const keysGuidePlayerTwo = document.createElement("div");
  keysGuidePlayerTwo.classList.add("css-keys-guide");
  keysGuidePlayerTwo.innerHTML = `
    <ul>keys Guide
      <li>H = <span class ='fire-dark'>Fire</span></li>
      <li>J = <span class ='water-dark'>Water</span></li>
      <li>K = <span class ='earth-light'>Earth</span></li>
      <li>L = <span class = 'air-dark'>Air</span></li>
    </ul>
  `;
  playerTwoContainer.appendChild(keysGuidePlayerTwo);
}

//global of allowed player inputs of player 1 and 2
let playerOneInputs = ["1", "2", "3", "4"];
let playerTwoInputs = ["h", "j", "k", "l", "H", "J", "K", "L"];

//function to check acceptedInputs
function acceptedInputs(event, array) {
  const allowedValues = array;
  const input = event.target;
  const inputValue = input.value;

  if (!allowedValues.includes(inputValue)) {
    input.value = "";
    return;
  }
}

//function to reduce life for each attacks
function reduceLife(currentLife, reduceValue) {
  let newLife = currentLife - reduceValue;
  return newLife;
}

//player attacks and implication
function playerAttackImpact(playerOneMove, playerTwoMove, player1, player2) {
  let attacks = {
    1: "fire",
    2: "water",
    3: "earth",
    4: "air",
    h: "fire",
    j: "water",
    k: "earth",
    l: "air",
  };

  if (playerOneMove === "" || playerTwoMove === "") {
    return `Please select a move. Or are you afraid to attack?`;
  } else if (
    (playerOneMove === 1 && playerTwoMove === "h") ||
    (playerOneMove === 2 && playerTwoMove === "j") ||
    (playerOneMove === 3 && playerTwoMove === "k") ||
    (playerOneMove === 4 && playerTwoMove === "l")
  ) {
    return `Both attacked with ${attacks[playerOneMove]}.<br> No points deducted to both players`;
  } else if (playerOneMove === 1 && playerTwoMove === "j") {
    playerOneLife = reduceLife(playerOneLife, 10);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    blinkImage(".player-one-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}. <br>${player2.playerName} wins.`;
  } else if (playerOneMove === 1 && playerTwoMove === "k") {
    playerTwoLife = reduceLife(playerTwoLife, 5);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    blinkImage(".player-two-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player1.playerName} wins.`;
  } else if (playerOneMove === 1 && playerTwoMove === "l") {
    playerTwoLife = reduceLife(playerTwoLife, 3);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    blinkImage(".player-two-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br>  ${player1.playerName} wins.`;
  } else if (playerOneMove === 2 && playerTwoMove === "h") {
    playerTwoLife = reduceLife(playerTwoLife, 10);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    blinkImage(".player-two-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player1.playerName} wins`;
  } else if (playerOneMove === 2 && playerTwoMove === "k") {
    playerOneLife = reduceLife(playerOneLife, 10);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    blinkImage(".player-one-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player2.playerName} wins.`;
  } else if (playerOneMove === 2 && playerTwoMove === "l") {
    playerTwoLife = reduceLife(playerTwoLife, 5);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    blinkImage(".player-two-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player1.playerName} wins.`;
  } else if (playerOneMove === 3 && playerTwoMove === "h") {
    playerOneLife = reduceLife(playerOneLife, 5);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    blinkImage(".player-one-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player2.playerName} wins.`;
  } else if (playerOneMove === 3 && playerTwoMove === "j") {
    playerTwoLife = reduceLife(playerTwoLife, 10);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    blinkImage(".player-two-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player1.playerName} wins.`;
  } else if (playerOneMove === 3 && playerTwoMove === "l") {
    playerOneLife = reduceLife(playerOneLife, 10);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    blinkImage(".player-one-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player2.playerName} wins.`;
  } else if (playerOneMove === 4 && playerTwoMove === "h") {
    playerOneLife = reduceLife(playerOneLife, 3);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    blinkImage(".player-one-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br>  ${player2.playerName} wins.`;
  } else if (playerOneMove === 4 && playerTwoMove === "j") {
    playerOneLife = reduceLife(playerOneLife, 5);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    blinkImage(".player-one-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player2.playerName} wins.`;
  } else if (playerOneMove === 4 && playerTwoMove === "k") {
    playerTwoLife = reduceLife(playerTwoLife, 10);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    blinkImage(".player-two-image");
    return `${player1.playerName} attacked with ${attacks[playerOneMove]}.<br> ${player2.playerName} attacked with ${attacks[playerTwoMove]}.<br> ${player1.playerName} wins.`;
  }
}
//who wins function condition to decide who wins
function whoWins(player1, player2, gameBoardStageBackgroundContainer) {
  if (playerOneLife < 1) {
    console.log("Player 2 wins");
    let winner = `${player2.playerName}`;
    whoWinsContainer(winner, gameBoardStageBackgroundContainer);
    createAutoplayLoopAudio("assets/end-game-avatar-music.mp3");
  } else if (playerTwoLife < 1) {
    console.log(`${player1.playerName} wins`);
    let winner = `${player1.playerName}`;
    whoWinsContainer(winner, gameBoardStageBackgroundContainer);
    createAutoplayLoopAudio("assets/end-game-avatar-music.mp3");
  }
}

//container to hold winner info and after game actions
function whoWinsContainer(winnerPlayer, gameBoardStageBackgroundContainer) {
  const backgroundOverlay = document.createElement("div");
  backgroundOverlay.classList.add("background-overlay");
  gameBoardStageBackgroundContainer.appendChild(backgroundOverlay);

  const displayWinnerContainer = document.createElement("div");
  displayWinnerContainer.classList.add("display-winner-container");
  backgroundOverlay.appendChild(displayWinnerContainer);

  const displayWinner = document.createElement("p");
  displayWinner.classList.add("display-winner");
  displayWinner.innerHTML = winnerPlayer + " wins!!";
  displayWinnerContainer.appendChild(displayWinner);

  const buttonsAndPhotoContainer = document.createElement("div");
  buttonsAndPhotoContainer.classList.add("buttons-and-photo-container");
  displayWinnerContainer.appendChild(buttonsAndPhotoContainer);

  const quoteInspo = document.createElement("div");
  quoteInspo.classList.add("quote-inspo");
  quoteInspo.textContent = `"If I try, I fail. If I don’t try, I’m never going to get it.-Aang"`;
  displayWinnerContainer.appendChild(quoteInspo);

  const tigerReferee = document.createElement("img");
  tigerReferee.setAttribute("src", "assets/aang-avatar.gif");
  tigerReferee.classList.add("tiger-referee-winner-container");
  buttonsAndPhotoContainer.appendChild(tigerReferee);

  //buttons container of retry and return home
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  buttonsAndPhotoContainer.appendChild(buttonsContainer);

  //create retry button
  const retryGame = document.createElement("button");
  retryGame.textContent = "Retry";
  retryGame.classList.add("retry-game");
  buttonsContainer.appendChild(retryGame);

  //retry sound click and restart game music
  retryGame.addEventListener("click", () => {
    createAutoplayLoopAudio("assets/game-start-music.mp3");
    buttonSound("assets/click-button.mp3");
  });

  //if retry is clicked, update player life back to 50/50
  retryGame.addEventListener("click", () => {
    displayWinnerContainer.style.display = "none";
    backgroundOverlay.style.display = "none";
    playerOneLife = reduceLife(50, 0);
    playerOneLifeBar.innerHTML = `${playerOneLife} / 50`;
    playerTwoLife = reduceLife(50, 0);
    playerTwoLifeBar.innerHTML = `${playerTwoLife} / 50`;
    setTimeout(() => {
      displayResultDiv.style.display = "none";
    }, 1000);
  });

  //create return home button
  const returnHomeButton = document.createElement("button");
  returnHomeButton.textContent = "Return Home";
  returnHomeButton.classList.add("return-home");
  buttonsContainer.appendChild(returnHomeButton);

  ///action if return is clicked
  returnHomeButton.addEventListener("click", () => {
    //call returnHome function to go back to main page
    returnHome();
    //button sound upon click
    buttonSound("assets/click-button.mp3");
    //play home musc
    createAutoplayLoopAudio("assets/background-music.mp3");
  });
}
