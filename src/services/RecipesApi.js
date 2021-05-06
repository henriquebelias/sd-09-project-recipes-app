async function searchApi(typeRecipe, typeSearch, itemSearch) {
  let url;
  if (typeRecipe === 'comidas') {
    switch (typeSearch) {
    case 'ingredient':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${itemSearch}`;
      break;
    case 'name':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemSearch}`;
      break;
    default:
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${itemSearch}`;
      break;
    }
  } else {
    switch (typeSearch) {
    case 'ingredient':
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${itemSearch}`;
      break;
    case 'name':
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${itemSearch}`;
      break;
    default:
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${itemSearch}`;
      break;
    }
  }

  const recipesSearch = await fetch(url)
    .then((response) => response.json()
      .then((data) => data));

  if (typeRecipe === 'comidas') {
    if (recipesSearch.meals === null) {
      return [];
    }
    return recipesSearch.meals;
  }
  if (recipesSearch.drinks === null) {
    return [];
  }
  return recipesSearch.drinks;
}

export const getRandomFood = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export const getRandomDrink = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export const getDrinkApi = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const fetchData = await fetch(url);
  const result = await fetchData.json();
  return result;
};

export default searchApi;
