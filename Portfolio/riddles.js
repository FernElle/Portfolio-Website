document.addEventListener('DOMContentLoaded', () => {

  // Screen sections
  const startScreen = document.getElementById("start-screen");
  const riddleScreen = document.getElementById("riddle-screen");
  const victoryScreen = document.getElementById("victory-screen");
  const gameoverScreen = document.getElementById("gameover-screen");


  // Buttons
  const startButton = document.getElementById("start-button");
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");
  const retryButton = document.getElementById("retry-button");
  const exitButton = document.getElementById("exit-button");

  // Riddle elements
  const riddleText = document.getElementById("riddle-text");
  const answerContainer = document.getElementById("answer-container");
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score-value");
  //let riddles = [];

  // Timer
  const timerDisplay = document.getElementById("time-left");

  // Riddle data
  const allRiddles = [
    {
      question: "What has keys but can't open locks?",
      options: ["A piano", "A map", "A lockpick", "A door"],
      answer: "A piano"
    },
    {
      question: "The more you take, the more you leave behind. What am I?",
      options: ["Memories", "Time", "Footsteps", "Air"],
      answer: "Footsteps"
    },
    {
      question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
      options: ["A pencil", "A candle", "A tree", "A matchstick"],
      answer: "A candle"
    },
    {
      question: "What has to be broken before you can use it?",
      options: ["A code", "An egg", "A promise", "A window"],
      answer: "An egg"
    },
    {
      question: "I have branches, but no fruit, trunk or leaves. What am I?",
      options: ["A tree", "A river", "A library", "A bank"],
      answer: "A bank"
    },
    {
      question: "The more you take away from me, the bigger I become. What am I?",
      options: ["A secret", "A balloon", "A hole", "A shadow"],
      answer: "A hole"
    }
  ];

  let riddles = []; // This will be the 3 random riddles used in each game


  let currentRiddle = 0;
  let score = 0;
  let timeLeft = 15;
  let timer;

  function showScreen(screen) {
    startScreen.classList.add("hidden");
    riddleScreen.classList.add("hidden");
    victoryScreen.classList.add("hidden");
    gameoverScreen.classList.add("hidden");
    screen.classList.remove("hidden");
  }


  function startGame() {
    score = 0;
    currentRiddle = 0;
    scoreDisplay.textContent = `${score} / 3`;
    timeLeft = 15;

    // Shuffle and slice 3 riddles from the full set
    riddles = [...allRiddles]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    showScreen(riddleScreen);
    loadRiddle();
    startTimer();
  }


  function loadRiddle() {
    const current = riddles[currentRiddle];
    if (!current) return;

    riddleText.textContent = current.question;
    answerContainer.innerHTML = "";
    feedback.textContent = "";
    feedback.classList.add("hidden");
    nextButton.classList.add("hidden");

    current.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("answer-button");
      btn.id = "answer-container-button"
      btn.addEventListener("click", () => checkAnswer(option));
      answerContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const correct = riddles[currentRiddle].answer;

    if (selected === correct) {
      feedback.textContent = "Correct!";
      feedback.className = "correct";
      feedback.classList.remove("hidden");
      score++;
      scoreDisplay.textContent = `${score} / 3`;

      nextButton.classList.remove("hidden");
      clearInterval(timer);
      Array.from(answerContainer.children).forEach(btn => btn.disabled = true);
    } else {
      feedback.textContent = `Oops, not quite.`;
      feedback.className = "incorrect";
      feedback.classList.remove("hidden");

      clearInterval(timer);
      Array.from(answerContainer.children).forEach(btn => btn.disabled = true);

      setTimeout(() => {
        alert("Incorrect! Game over. Try again.");
        showScreen(startScreen);
      }, 500);

    }
  }

  function nextRiddle() {
    currentRiddle++;
    if (currentRiddle < riddles.length) {
      timeLeft = 15;
      loadRiddle();
      startTimer();
    } else {
      showScreen(victoryScreen);
    }
  }

  function startTimer() {
    clearInterval(timer);
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        feedback.textContent = "Time's up!";
        feedback.className = "incorrect";
        feedback.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        Array.from(answerContainer.children).forEach(btn => btn.disabled = true);
      }
    }, 1000);
  }

  // Button Event Listeners
  startButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", nextRiddle);
  restartButton?.addEventListener("click", startGame); // in case restart button exists
  retryButton.addEventListener("click", startGame);
  exitButton.addEventListener("click", () => {
  clearInterval(timer); // Stop timer if it's running
  showScreen(startScreen); // Go back to start
  });
});