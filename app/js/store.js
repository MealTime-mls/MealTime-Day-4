import { fetchCategories, fetchMealById, fetchMealsByCategory } from './fetch-handlers';

export const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
export const categories = JSON.parse(localStorage.getItem('categories')) || [];
export const mealsByCategory = JSON.parse(localStorage.getItem('mealsByCategory')) || {};
export const meals = JSON.parse(localStorage.getItem('meals')) || {};

export const getCategories = async () => {
  if (categories.length === 0) {
    let [data, error] = await fetchCategories();
    if (error) {
      console.error(error);
      return [];
    }
    categories.push(...data);
    localStorage.setItem('categories', JSON.stringify(categories));
  }
  return categories;
}

export const getMealsByCategory = async (category) => {
  if (!mealsByCategory[category]) {
    let [data, error] = await fetchMealsByCategory(category);
    if (error) {
      console.error(error);
      return [];
    }
    mealsByCategory[category] = data;
    localStorage.setItem('mealsByCateogory', JSON.stringify(mealsByCategory));
  }
  return mealsByCategory[category];
}

export const getMealById = async (id) => {
  if (!meals[id]) {
    let [data, error] = await fetchMealById(id);
    if (error) {
      console.error(error);
      return {};
    }
    meals[id] = data;
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  return meals[id];
}

export const isBookmarked = (id) => {
  return bookmarks.includes(id);
}

export const bookmark = (id) => {
  bookmarks.push(id);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export const unbookmark = (id) => {
  const index = bookmarks.indexOf(id);
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export default bookmarks;