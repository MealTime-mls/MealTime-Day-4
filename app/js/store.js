import { fetchCategories, fetchMealById, fetchMealsByCategory } from './fetch-handlers';

/** 
 * Helper functions for local storage
*/
const getState = (property) => {
  try {
    return JSON.parse(localStorage.getItem(property));
  } catch (error) {
    console.error;
    return null;
  }
}

const setState = (property, value) => {
  localStorage.setItem(property, JSON.stringify(value));
}


export const getCategories = async () => {
  if (!getState('categories')) {
    let categories = await fetchCategories();
    setState('categories', categories);
  }
  return getState('categories');
}

export const getMealsByCategory = async (category) => {
  const mealsByCategory = getState('mealsByCategory') || {};
  if (!mealsByCategory[category]) {
    let meals = await fetchMealsByCategory(category);
    mealsByCategory[category] = meals;
    setState('mealsByCategory', mealsByCategory);
  }
  return getState('mealsByCategory')[category];
}

export const getMealById = async (id) => {
  const meals = getState('meals') || {};
  if (!meals[id]) {
    let meal = await fetchMealById(id);
    meals[id] = meal;
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  console.log(meals[id]);
  return meals[id];
}

export const isBookmarked = (id) => {
  const bookmarks = getState('bookmarks') || [];
  return bookmarks.includes(id);
}

export const bookmark = (id) => {
  setState('bookmarks', [...getState('bookmarks'), id]);
}

export const unbookmark = (id) => {
  const bookmarks = getState('bookmarks') || [];
  setState('bookmarks', bookmarks.filter(bookmark => bookmark !== id));
}