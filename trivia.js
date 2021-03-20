const fetch = require("node-fetch");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = "https://zenquotes.io/api/random";

let turns = 0;
let maxTurns = 0;
let points = 0;

async function startGame() {
  rl.question("How many turns would you like to play? \n>", (answer) => {
    maxTurns = Number(answer);
    playGame();
  });
}

async function playGame() {
  if (turns === maxTurns) {
    console.log(`Game over! You scored ${points}/${maxTurns}`);
    rl.close();
  } else {
    askQuestion();
  }
}

async function askQuestion() {
  correctAnswer = await getQuestions(url);
  false1 = await getQuestions(url);
  false2 = await getQuestions(url);
  false3 = await getQuestions(url);
  turns++;

  let seed = Math.floor(Math.random() * Math.floor(4)) + 1;
  let answerA;
  let answerB;
  let answerC;
  let answerD;

  if (seed === 1) {
    answerA = correctAnswer[1];
    answerB = false1[1];
    answerC = false2[1];
    answerD = false3[1];
    correct = "a";
  }
  if (seed === 2) {
    answerA = false1[1];
    answerB = correctAnswer[1];
    answerC = false2[1];
    answerD = false3[1];
    correct = "b";
  }
  if (seed === 3) {
    answerA = false2[1];
    answerB = false1[1];
    answerC = correctAnswer[1];
    answerD = false3[1];
    correct = "c";
  }

  if (seed === 4) {
    answerA = false3[1];
    answerB = false1[1];
    answerC = false2[1];
    answerD = correctAnswer[1];
    correct = "d";
  }

  rl.question(
    `Question ${turns} \nWho said the following quote? \n${correctAnswer[0]}\na) ${answerA} \nb) ${answerB}\nc) ${answerC}\nd) ${answerD} \n>`,
    (answer) => {
      if (answer === correct) {
        points++;
        console.log("Correct!");
        playGame();
      } else {
        console.log(`Incorrect, the correct answer was ${correctAnswer[1]}`);
        playGame();
      }
    }
  );
}

async function getQuestions(address) {
  const res = await fetch(address);
  const quote = await res.json();
  return [quote[0].q, quote[0].a];
}
startGame();
