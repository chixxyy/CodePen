let wordList = [
  {
    word: "banana",
    hint: "yellow fruit",
  },
  {
    word: "candy",
    hint: "sweet treat",
  },
  {
    word: "github",
    hint: "code hosting platform",
  },
  {
    word: "png",
    hint: "a image file format",
  },
  {
    word: "silver",
    hint: "precious greyish-white metal",
  },
  {
    word: "mobile",
    hint: "an electronic device",
  },
  {
    word: "gpu",
    hint: "computer component",
  },
  {
    word: "java",
    hint: "programming language",
  },
  {
    word: "google",
    hint: "famous search engine",
  },
  {
    word: "venice",
    hint: "famous city of waters",
  },
  {
    word: "excel",
    hint: "microsoft product for windows",
  },
  {
    word: "dance",
    hint: "move to music",
  },
  {
    word: "eagle",
    hint: "bird of prey",
  },
  {
    word: "grape",
    hint: "small fruit",
  },
  {
    word: "honey",
    hint: "sweet syrup",
  },
  {
    word: "jelly",
    hint: "fruit spread",
  },
  {
    word: "lemon",
    hint: "sour citrus",
  },
  {
    word: "melon",
    hint: "sweet fruit",
  },
  {
    word: "olive",
    hint: "small fruit",
  },
  {
    word: "peach",
    hint: "soft fruit",
  },
  {
    word: "queen",
    hint: "female ruler",
  },
  {
    word: "rabbit",
    hint: "furry animal",
  },
  {
    word: "spider",
    hint: "eight-legged bug",
  },
  {
    word: "tiger",
    hint: "big cat",
  },
  {
    word: "uncle",
    hint: "father's brother",
  },
  {
    word: "virus",
    hint: "sickness",
  },
  {
    word: "water",
    hint: "clear liquid",
  },
  {
    word: "xenon",
    hint: "chemical element",
  },
  {
    word: "yacht",
    hint: "boat",
  },
  {
    word: "bread",
    hint: "baked food",
  },
  {
    word: "cheese",
    hint: "dairy product",
  },
  {
    word: "donkey",
    hint: "horse relative",
  },
  {
    word: "eggnog",
    hint: "holiday drink",
  },
  {
    word: "fridge",
    hint: "appliance",
  },
  {
    word: "guitar",
    hint: "stringed instrument",
  },
  {
    word: "hockey",
    hint: "ice sport",
  },
  {
    word: "igloo",
    hint: "snow house",
  },
  {
    word: "jacket",
    hint: "clothing item",
  },
  {
    word: "kettle",
    hint: "water boiler",
  },
  {
    word: "leaves",
    hint: "tree part",
  },
  {
    word: "mantis",
    hint: "insect",
  },
  {
    word: "noodle",
    hint: "pasta",
  },
  {
    word: "orange",
    hint: "citrus fruit",
  },
  {
    word: "pepper",
    hint: "spice",
  },
  {
    word: "mysql",
    hint: "a relational database system",
  },
  {
    word: "iran",
    hint: "developing country name",
  },
  {
    word: "flute",
    hint: "a musical instrument",
  },
  {
    word: "crypto",
    hint: "related to cryptocurrency",
  },
  {
    word: "tesla",
    hint: "unit of magnetic flux density",
  },
  {
    word: "mars",
    hint: "planet of our solar system",
  },
  {
    word: "proxy",
    hint: "related to server application",
  },
  {
    word: "email",
    hint: "related to exchanging message",
  },
  {
    word: "html",
    hint: "markup language for the web",
  },
  {
    word: "air",
    hint: "related to a gas",
  },
  {
    word: "idea",
    hint: "a thought or suggestion",
  },
  {
    word: "server",
    hint: "related to computer or system",
  },
  {
    word: "svg",
    hint: "a vector image format",
  },
  {
    word: "jpeg",
    hint: "a image file format",
  },
  {
    word: "search",
    hint: "act to find something",
  },
  {
    word: "key",
    hint: "small piece of metal",
  },
  {
    word: "egypt",
    hint: "a country name",
  },
  {
    word: "joker",
    hint: "psychological thriller film",
  },
  {
    word: "dubai",
    hint: "developed country name",
  },
  {
    word: "photo",
    hint: "representation of person or scene",
  },
  {
    word: "nile",
    hint: "largest river in the world",
  },
  {
    word: "rain",
    hint: "related to a water",
  },
  {
    word: "python",
    hint: "programming language",
  },
  {
    word: "guitar",
    hint: "a musical instrument",
  },
  {
    word: "aim",
    hint: "a purpose or intention",
  },
  {
    word: "venus",
    hint: "planet of our solar system",
  },
  {
    word: "gold",
    hint: "a yellow precious metal",
  },
  {
    word: "ebay",
    hint: "online shopping site",
  },
  {
    word: "golang",
    hint: "programming language",
  },
  {
    word: "coding",
    hint: "related to programming",
  },
  {
    word: "matrix",
    hint: "science fiction movie",
  },
  {
    word: "bugs",
    hint: "related to programming",
  },
  {
    word: "avatar",
    hint: "epic science fiction film",
  },
  {
    word: "gif",
    hint: "a file format for image",
  },
  {
    word: "mental",
    hint: "related to the mind",
  },
  {
    word: "map",
    hint: "diagram represent of an area",
  },
  {
    word: "island",
    hint: "land surrounded by water",
  },
  {
    word: "hockey",
    hint: "a famous outdoor game",
  },
  {
    word: "chess",
    hint: "related to a indoor game",
  },
  {
    word: "viber",
    hint: "a social media app",
  },
];
const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintBtn = document.querySelector(".showhint"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

let word,
  incorrectLetters = [],
  correctLetters = [],
  maxGuesses;

function startNewGame() {
  alert("遊戲開始！猜猜看什麼單字！");
  hintElement.style.display = "none";
  hintElement.style.opacity = "0";

  const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranWord.word;
  maxGuesses = word.length >= 6 ? 10 : 8;
  incorrectLetters = [];
  correctLetters = [];
  hintTag.innerText = ranWord.hint;
  guessLeft.innerText = maxGuesses;
  mistakes.innerText = incorrectLetters;

  inputs.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    inputs.appendChild(input);
  }
}

function handleInput(e) {
  const key = e.target.value.toLowerCase();
  if (
    key.match(/^[a-z]+$/i) &&
    !incorrectLetters.includes(`${key}`) &&
    !correctLetters.includes(`${key}`)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll("input")[i].value += key;
        }
      }
      correctLetters += key;
    } else {
      maxGuesses--;
      incorrectLetters.push(`${key}`);
      mistakes.innerText = incorrectLetters;
    }
  }

  guessLeft.innerText = maxGuesses;
  if (correctLetters.length === word.length) {
    alert(`恭喜！答對了！${word.toUpperCase()}`);
    startNewGame();
  } else if (maxGuesses < 1) {
    alert("遊戲結束！");
    for (let i = 0; i < word.length; i++) {
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }
  typeInput.value = "";
}

function showHintElement() {
  hintElement.style.display = "block";
  hintElement.style.opacity = "1";
}

resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();
