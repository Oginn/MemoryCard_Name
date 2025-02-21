const grid = document.getElementById("grid");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");
const restartButton = document.getElementById("restart");

const cards = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🍉", "🍑"];
const cardPairs = [...cards, ...cards]; // Duplicate cards for pairs

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;
let timer;

// Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the card grid
function createGrid() {
  const shuffledCards = shuffle(cardPairs);
  grid.innerHTML = "";
  shuffledCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card;
    cardElement.addEventListener("click", flipCard);
    grid.appendChild(cardElement);
  });
}

// Flip a card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      checkMatch();
    }
  }
}

// Check if flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.textContent === card2.textContent) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);

    if (matchedCards.length === cardPairs.length) {
      clearInterval(timer);
      setTimeout(() => alert(`You Win! Moves: ${moves}, Time: ${time}s`), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }

  flippedCards = [];
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
  }, 1000);
}

// Restart the game
function restartGame() {
  clearInterval(timer);
  time = 0;
  moves = 0;
  matchedCards = [];
  movesDisplay.textContent = moves;
  timeDisplay.textContent = time;
  createGrid();
  startTimer();
}

// Initialize the game
restartButton.addEventListener("click", restartGame);
createGrid();
startTimer();