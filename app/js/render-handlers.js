import { bookmark, isBookmarked, unbookmark, getCategories, getMealsByCategory, getMealById } from './store';

export async function renderApp() {
  document.querySelector('#app').innerHTML = `
    <div>
      <h1>Meal Time!</h1>
      <select id="category" name="category"></select>
      <h2>Favorites</h2>
        <div id="favorites">
      </div>
      <hr>
      <div id="meals"></div>
      <p id="error"></p>
    </div>
    <div id='recipeOverlay' class='hidden'>
    </div>
  `

  const categories = await getCategories();
  categories.forEach(renderCategoryOption);

  renderMealsByCategory(categories[0].strCategory);

  document.querySelector('#category').addEventListener('change', (e) => {
    renderMealsByCategory(e.target.value);
  })
}

export function renderCategoryOption(category) {
  const option = document.createElement("option");
  option.value = category.strCategory;
  option.innerText = category.strCategory;
  document.querySelector("#category").append(option);
}

export async function renderMealsByCategory(category) {
  document.querySelector("#meals").innerHTML = "";
  document.querySelector("#favorites").innerHTML = "";
  const meals = await getMealsByCategory(category);
  meals.forEach(renderMeal);
}

export function renderMeal({ idMeal, strMeal, strMealThumb }) {
  const mealDiv = document.createElement("div");
  mealDiv.className = "mealCard";
  mealDiv.setAttribute('id', `meal-${idMeal}`);
  mealDiv.innerHTML = `
    <h3>${strMeal}</h3>
  `
  mealDiv.addEventListener('click', () => {
    renderMealRecipe(idMeal);
  });

  const bookmarkButton = document.createElement('button');
  bookmarkButton.className = `bookmarkButton ${isBookmarked(idMeal) ? "bookmarked" : ""}`;
  bookmarkButton.innerHTML = `♡`;
  bookmarkButton.addEventListener('click', (e) => {
    e.stopPropagation();
    bookmarkMeal(e, idMeal)
  });

  if (isBookmarked(idMeal)) {
    document.querySelector("#favorites").append(mealDiv);
  } else {
    document.querySelector("#meals").append(mealDiv);
  }

  const mealCardImageContainer = document.createElement('div');
  mealCardImageContainer.className = "mealCardImageContainer"
  mealDiv.append(mealCardImageContainer);

  const img = document.createElement(`img`);
  img.src = strMealThumb;
  mealCardImageContainer.append(bookmarkButton, img);
}

async function renderMealRecipe(idMeal) {
  const meal = await getMealById(idMeal);
  const recipeOverlay = document.querySelector("#recipeOverlay");
  recipeOverlay.className = "visible"
  recipeOverlay.innerHTML = `
    <div id="recipeOverlayContents">
      <div id="overlayHeader">
        <button id="closeOverlayButton">X</button>
        <button id="overlayBookmarkButton" class="bookmarkButton ${isBookmarked(idMeal) ? "bookmarked" : ""}">♡</button>
        </div>
      <h2 id="recipeTitle">${meal.strMeal}</h2>
      <div id="overlayImageAndIngredients">
        <div id="overlayImageContainer">
          <img src="${meal.strMealThumb}">
        </div>
        <div id="overlayIngredientsContainer">
          <h3>Ingredients</h3>
          <ul id="ingredientsList"></ul>
        </div>
      </div>
      <div id="recipeInstructionsContainer">
        <h3>Instructions</h3>
        <p id="recipeInstructions">${meal.strInstructions}</p>
      </div>
    </div>
  `;

  // Find and list the ingredients
  let ingredientNum = 1;
  let ingredient = meal[`strIngredient${ingredientNum}`];
  let amount = meal[`strMeasure${ingredientNum}`];
  const ingredientsList = document.querySelector("#ingredientsList");
  while (ingredient) {
    ingredientsList.innerHTML += `<li>${ingredient}: <em>${amount}</em></li>`;
    ingredientNum++;
    ingredient = meal[`strIngredient${ingredientNum}`];
    amount = meal[`strMeasure${ingredientNum}`];
  }

  document.querySelector("#closeOverlayButton").addEventListener('click', () => {
    recipeOverlay.className = "hidden";
  });

  document.querySelector("#overlayBookmarkButton").addEventListener('click', (e) => bookmarkMeal(e, idMeal))
}

const bookmarkMeal = (e, idMeal) => {
  e.target.className = `bookmarkButton ${isBookmarked(idMeal) ? "" : "bookmarked"}`;
  const mealCard = document.querySelector(`#meal-${idMeal}`)
  mealCard.remove();
  if (!isBookmarked(idMeal)) {
    bookmark(idMeal);
    document.querySelector("#favorites").append(mealCard);
  } else {
    unbookmark(idMeal);
    document.querySelector("#meals").append(mealCard);
  }
}