import { clearGameBoardCanvas, returnHome } from "./game-board.js";
import { game } from "./game.js";
import { createAutoplayLoopAudio, buttonSound } from "./audio.js";

const gameBoardStage = document.getElementById("game-board-overlay");

let playersSection = "";
let player1 = "";
let player2 = "";
let playerNameContainer = "";

export function createPlayers() {
  //clear canvas first before running the function
  clearGameBoardCanvas();

  //heading intro of create players page
  const introCreatePlayer = document.createElement("h2");
  introCreatePlayer.classList.add("css-intro-create-player");
  introCreatePlayer.textContent =
    "Enter the realm of pro-bending showdown and prove your worth!";
  gameBoardStage.appendChild(introCreatePlayer);

  //regeree image
  const gameRefereeContainer = document.createElement("div");
  gameRefereeContainer.classList.add("game-referee-container");
  gameBoardStage.appendChild(gameRefereeContainer);

  const gameReferee = document.createElement("img");
  gameReferee.setAttribute("src", "assets/warrior-referee.gif");
  gameReferee.classList.add("warrior-referee");
  gameRefereeContainer.appendChild(gameReferee);

  //players section
  playersSection = document.createElement("div");
  playersSection.classList.add("css-players-section");
  gameBoardStage.appendChild(playersSection);

  playerNameContainer = document.createElement("div");
  playerNameContainer.classList.add("player-name-container");
  playerNameContainer.innerHTML = "";
  gameBoardStage.appendChild(playerNameContainer);

  //player1 details
  player1 = new NewPlayer(
    1,
    playersSection,
    playerNameContainer.innerHTML,
    "p1-input"
  );
  player1.createPlayer();

  //player 2 details
  player2 = new NewPlayer(
    2,
    playersSection,
    playerNameContainer.innerHTML,
    "p2-input"
  );
  player2.createPlayer();

  //container of start and return home buttons
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("css-buttons-container-create-player");
  gameBoardStage.appendChild(buttonsContainer);

  //create button to start game
  const startButton = document.createElement("button");
  startButton.innerHTML = "Start";
  startButton.style.backgroundColor = "red";
  startButton.style.width = "200px";
  startButton.setAttribute("class", "css-start-button-create-player");
  buttonsContainer.appendChild(startButton);

  //return home button
  const homeButton = document.createElement("button");
  homeButton.innerHTML = " « Return HOME » ";
  homeButton.style.width = "150px";
  homeButton.classList.add("css-home-button-create-player");
  buttonsContainer.appendChild(homeButton);
  homeButton.addEventListener("click", () => {
    returnHome(), buttonSound("assets/click-button.mp3");
  });

  //query select check buttons and apply event listener
  const checkedElement = document.querySelectorAll(".check-button");
  console.log(checkedElement);

  checkedElement.forEach((element) => {
    element.addEventListener("click", () => {
      buttonSound("assets/click-button.mp3");
    });
  });

  //event listener to check if player provided name
  startButton.addEventListener("click", () => {
    if (player1.playerName === "" || player2.playerName === "") {
      buttonSound("assets/error-sound.mp3");
      provideNameWarningPopUp(
        "For the sake of your honor, Reveal your name & click check to confirm!"
      );
    } else {
      game(player1, player2);
      createAutoplayLoopAudio("assets/game-start-music.mp3");
    }
  });
  document.getElementById("p1-input").focus();
}

let provideNameWarning;

//if input is empty, create a pop up warning
function provideNameWarningPopUp(text) {
  provideNameWarning = document.createElement("div");
  provideNameWarning.classList.add("provide-name-warning");
  provideNameWarning.textContent = text;
  gameBoardStage.appendChild(provideNameWarning);

  setTimeout(() => {
    provideNameWarning.style.display = "none";
  }, 3000);
}

//constructor for each players
export class NewPlayer {
  constructor(playerNumber, container, playerName, inputId) {
    this.playerNumber = playerNumber;
    this.container = container;
    this.playerName = playerName;
    this.inputId = inputId;
  }

  createPlayer() {
    //player container
    const createPlayerContainer = document.createElement("div");
    createPlayerContainer.classList.add("create-player-container");
    this.container.appendChild(createPlayerContainer);

    //Player input
    const createPlayerName = document.createElement("input");
    createPlayerName.setAttribute("placeholder", `Bender ${this.playerNumber}`);
    createPlayerName.setAttribute("id", this.inputId);
    createPlayerName.classList.add("player-name-input");
    createPlayerContainer.appendChild(createPlayerName);

    //check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    createPlayerContainer.appendChild(checkButton);

    //image for check button
    const checkImage = document.createElement("img");
    checkImage.setAttribute("src", "assets/check-icon.png");
    checkImage.setAttribute("alt", "check button");
    checkImage.classList.add("check-image");

    //add check image to check button
    checkButton.appendChild(checkImage);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    createPlayerContainer.appendChild(deleteButton);

    //image for delete button
    const deleteImage = document.createElement("img");
    deleteImage.setAttribute("src", "assets/delete-icon.png");
    deleteImage.setAttribute("alt", "delete button");
    deleteImage.classList.add("delete-image");

    // add image to delete button
    deleteButton.appendChild(deleteImage);

    //player name display div
    const playerNameDisplay = document.createElement("div");
    playerNameDisplay.classList.add(
      "diplay-player-name",
      `player-number-${this.playerNumber}`
    );
    createPlayerContainer.appendChild(playerNameDisplay);

    //diplay name after check or reminder if empty
    let enteredName = "";
    checkButton.addEventListener("click", () => {
      enteredName = createPlayerName.value;

      if (!enteredName) {
        enteredName = createPlayerName.value;
        playerNameDisplay.style.color = "red";
        playerNameDisplay.textContent = "Please enter your name, pro-bender";
      } else {
        playerNameDisplay.style.color = "black";
        playerNameDisplay.textContent = `Bender ${this.playerNumber}:  ${enteredName}`;
        this.playerName = enteredName;
      }
    });

    //remove content input if need to change details
    let deleteButtonEl = document.querySelectorAll(".delete-button");
    deleteButtonEl.forEach((element) => {
      element.addEventListener("click", () => {
        buttonSound("assets/click-button.mp3");
      });
    });

    deleteButton.addEventListener("click", () => {
      playerNameDisplay.textContent = "";
    });
  }
}
