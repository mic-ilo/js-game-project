import { clearGameBoardCanvas, returnHome } from "./game-board.js";
import { buttonSound } from "./audio.js";

//how to play the game guide
export function instructionsPage() {
  //clear any existing info on board before loading the page
  clearGameBoardCanvas();

  //title
  const instructionTitle = document.createElement("h1");
  const gameBoardElement = document.getElementById("game-board-overlay");
  instructionTitle.textContent = "How to play the game?";
  instructionTitle.classList.add("css-instructions-page-title");
  gameBoardElement.appendChild(instructionTitle);

  //content
  const instructionItems = document.createElement("div");
  instructionItems.classList.add("css-instruction-items");
  instructionItems.innerHTML = `
        <ol>
           <li><span class="font-bold">Players:</span> The game accommodates two players on a single computer</li>
           <li><span class="font-bold">Elements:</span> The game features four elements- Fire, Water, Air and Earth
           <li><span class="font-bold">Battery life:</span> Each player starts with a battery life of 50 points</li>
           <li><span class="font-bold">Battle System:</span> Each round, both players simultaneously select one Element</li>
           <li><span class="font-bold">Element Interactions and Scoring:</span>
              <ul>
                <li>Element vs same element type - No point deducted</li>
                <li><span class="fire-light">Fire</span> vs <span class="water-light">Water</span>- Fire loses 10 points</li>
                <li><span class="fire-light">Fire</span> vs <span class="air-dark">Air</span> - Air loses 3 points</li>
                <li><span class="water-light">Water</span> vs <span class="earth-light">Earth</span> -Water loses 10 points</li>
                <li><span class="earth-light">Earth</span> vs <span class="air-dark">Air</span> - Earth loses 10 points</li>
                <li><span class="earth-light">Earth</span>  vs <span class="fire-light">Fire</span>- Earth loses 5 points</li>
                <li><span class="air-dark">Air</span> vs <span class="water-light">Water</span> - Air loses 5 points</li>
                </ul> 
                    </li>
            <li><span class="font-bold">Battery Life Updates:</span> Points deducted from a player's battery life accumulate round by round based on the element interactions</li>
            <li><span class="font-bold">Winning the game:</span> The game contrinues until one player's battery life reaches Zero. The winner is the one with the remaining battery life </li>
        <ol>`;

  gameBoardElement.appendChild(instructionItems);

  //create home button to return home
  const homeButtonContainer = document.createElement("div");
  homeButtonContainer.classList.add("home-button-container");
  gameBoardElement.appendChild(homeButtonContainer);

  //event listener once homebutton is clicked
  const homeButton = document.createElement("button");
  homeButton.innerHTML = " « Return HOME » ";
  homeButton.classList.add("css-home-button");
  homeButtonContainer.appendChild(homeButton);
  homeButton.addEventListener("click", () => {
    //run return home function
    returnHome();
    //play click sound
    buttonSound("assets/click-button.mp3");
  });
}
