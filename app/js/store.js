import { fetchCategories, fetchMealById, fetchMealsByCategory } from './fetch-handlers';

export const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
export const categories = JSON.parse(localStorage.getItem('categories')) || [];
export const meals = JSON.parse(localStorage.getItem('meals')) || {};

export const getCategories = async () => {
  if (categories.length === 0) {
    console.log("fetching categories");
    let [data, error] = await fetchCategories();
    if (error) {
      console.log(error);
    }
    categories.push(...data);
    localStorage.setItem('categories', JSON.stringify(categories));
  } else {
    console.log("using cached categories", categories)
  }
  return categories;
}

export const getMeals = async () => {
  if (categories.length === 0) {
    let [data, error] = await fetchCategories();
    if (error) {
      console.log(error);
    }
    categories.push(...data);
    localStorage.setItem('categories', JSON.stringify(categories));
  }
  return categories;
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