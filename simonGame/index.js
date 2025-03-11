const scoreE1 = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerE1 = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultE1 = document.querySelector("#score-result");
const wrapperE1 = document.querySelector(".wrapper");

const colorObj = {
  color1: { current: "#006400", new: "#00FF00" },
  color2: { current: "#800000", new: "#FF0000" },
  color3: { current: "#0000B8", new: "#0000FF" },
  color4: { current: "#808000", new: "#FFFF00" },
};

let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

const getRandomColor = (colorsObj) => {
  const colorKeys = Object.keys(colorsObj);
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

const delay = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

const generateRandomPath = async () => {
  randomColors.push(getRandomColor(colorObj));
  score = randomColors.length;
  isPathGenerating = true;
  await showPath(randomColors);
};

const showPath = async (colors) => {
  scoreE1.innerText = score;
  for (let color of colors) {
    const currentColor = document.querySelector(`.${color}`);
    await delay(500);
    currentColor.style.backgroundColor = colorObj[color].new;
    await delay(600);
    currentColor.style.backgroundColor = colorObj[color].current;
    await delay(600);
  }
  isPathGenerating = false;
};

const endGame = () => {
  resultE1.innerHTML = `<span>得分：${score}</span>`;
  resultE1.classList.remove("hide");
  containerE1.classList.remove("hide");
  wrapperE1.classList.add("hide");
  startBtn.innerText = "重新開始";
  startBtn.classList.remove("hide");
};

const resetGame = () => {
  score = 0;
  clickCount = 0;
  randomColors = [];
  isPathGenerating = false;
  wrapperE1.classList.remove("hide");
  containerE1.classList.add("hide");
  generateRandomPath();
};

const handleColorClick = async (e) => {
  if (isPathGenerating) {
    return false;
  }
  if (e.target.classList.contains(randomColors[clickCount])) {
    e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
    await delay(500);
    e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
    clickCount++;
    if (clickCount === score) {
      clickCount = 0;
      generateRandomPath();
    }
  } else {
    endGame();
  }
};

startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
