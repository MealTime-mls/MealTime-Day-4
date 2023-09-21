const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const handleFetch = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [null, { status: res.status, message: res.statusText }];
    }
    const data = await res.json();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const fetchCategories = async () => {
  const url = `${BASE_URL}/categories.php`;
  const [categoriesResponse, error] = await handleFetch(url);
  return error ? [] : categoriesResponse.categories;
}

export const fetchMealsByCategory = async (category) => {
  const url = `${BASE_URL}/filter.php?c=${category}`;
  const [mealsResponse, error] = await handleFetch(url);
  return error ? [] : mealsResponse.meals;
}
export const fetchMealById = async (id) => {
  const url = `${BASE_URL}/lookup.php?i=${id}`;
  const [mealResponse, error] = await handleFetch(url);
  return error ? {} : mealResponse.meals[0]
}