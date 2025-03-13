const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchContainer = document.querySelector(".search-box");

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchMeal();
  }
});

function searchMeal() {
  const userInput = searchInput.value.trim();
  if (!userInput) {
    resultContainer.innerHTML = `<h3>請輸入料理英文名稱</h3>`;
    return;
  }
  fetch(apiUrl + userInput)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      if (!meal) {
        resultContainer.innerHTML = `<h3>查無餐點，請重試！</h3>`;
        return;
      }
      const ingredients = getIngredients(meal);
      const recipeHtml = `
            <div class="details">
                <h2>${meal.strMeal}</h2>
                <h4>${meal.strArea}</h4>
            </div>
            <img src=${meal.strMealThumb} alt=${meal.strMeal} />
            <div id="ingre-container">
                <h3>成分：</h3>
                <ul>${ingredients}</ul>
            </div>
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <pre id="instructions">${meal.strInstructions}</pre>
            </div>
            <button id="show-recipe">查看食譜</button>
        `;
      resultContainer.innerHTML = recipeHtml;

      const hideRecipeBtn = document.getElementById("hide-recipe");
      hideRecipeBtn.addEventListener("click", hideRecipe);
      const showRecipeBtn = document.getElementById("show-recipe");
      showRecipeBtn.addEventListener("click", showRecipe);
      searchContainer.style.opacity = "0";
      searchContainer.style.display = "none";
    })
    .catch(() => {
      searchContainer.style.opacity = "1";
      searchContainer.style.display = "grid";
      resultContainer.innerHTML = `<h3>查無資料</h3>`;
    });
}

function getIngredients(meal) {
  let ingreHtml = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingreHtml += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingreHtml;
}

function hideRecipe() {
  const recipe = document.getElementById("recipe");
  recipe.style.display = "none";
}
function showRecipe() {
  const recipe = document.getElementById("recipe");
  recipe.style.display = "block";
}
