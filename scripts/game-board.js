import { createPlayers } from "./create-players.js";
import { instructionsPage } from "../scripts/instructions-page.js";
import { createAutoplayLoopAudio, buttonSound } from "./audio.js";

//Game Title
const heading = document.createElement("h1");
heading.textContent = "PRO-BENDING SHOWDOWN";
heading.setAttribute("class", "css-game-title");
const gameBoard = document.getElementById("game-board");
gameBoard.appendChild(heading);

//Clear game board function used to clear game stage
export function clearGameBoardCanvas() {
  const gameBoardElement = document.getElementById("game-board-overlay");
  const gameBoardContainer = document.getElementById("game-board");
  gameBoardElement.innerHTML = "";
  gameBoardContainer.appendChild(gameBoardElement);
}

//function to return home
function gameHome() {
  const elements = [
    "assets/air-icon-home.jpg",
    "assets/earth-icon-home.jpg",
    "assets/fire-icon-home.jpg",
    "assets/water-icon-home.jpg",
  ];
  //gambeoard stage
  const gameBoardStage = document.getElementById("game-board-overlay");

  //container of all content of home
  const homeDiv = document.createElement("div");
  homeDiv.classList.add("css-home-container");
  gameBoardStage.appendChild(homeDiv);

  const elementContainer = document.createElement("div");

  elementContainer.classList.add("css-element-container");
  homeDiv.appendChild(elementContainer);

  elements.forEach((element) => {
    const elementItem = document.createElement("img");
    elementItem.setAttribute("src", element);
    elementItem.classList.add("css-element-item");
    elementContainer.appendChild(elementItem);
  });

  //game overview header
  const gameOverview = document.createElement("div");
  gameOverview.innerHTML =
    "Enter an elemental showdown, where <span class ='css-gameOverview-fire'>fire</span> conquers, <span class='css-gameOverview-water'>water</span> subdues, <span class='css-gameOverview-air'>air</span> sweeps, and <span class='css-gameOverview-earth'>earth</span> holds its ground, in a unique twist on the classic game of rock-paper-scissors!";
  gameOverview.classList.add("css-game-overview");
  homeDiv.appendChild(gameOverview);

  //start button to proceed to next step
  const startButton = document.createElement("button");
  startButton.innerHTML = "Start";
  startButton.setAttribute("class", "css-start-button");
  homeDiv.appendChild(startButton);

  //add sound effect when start button is clicked. attach buttondSound function
  startButton.addEventListener("click", () => {
    createPlayers();
    buttonSound("assets/click-button.mp3");
  });

  //create instruction buttton
  const instructionsButton = document.createElement("button");
  instructionsButton.textContent = "How to play the game?";
  instructionsButton.classList.add("instructions-button");
  homeDiv.appendChild(instructionsButton);

  //event listener that will lead to instruction page function and attach sound on click
  instructionsButton.addEventListener("click", () => {
    instructionsPage();
    buttonSound("assets/click-button.mp3");
  });
}

//return home function
export function returnHome() {
  clearGameBoardCanvas();
  gameHome();
}

gameHome();

// auto load music
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  createAutoplayLoopAudio("assets/background-music.mp3");
});
