import {
  SUCCESS_RECIPE,
  FETCHING_RECIPE,
  SUCCESS_RECOMMENDED,
  SAVE_INGREDIENTS,
  SUCCESS_RANDOM_RECOMMENDED,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  isFetchingRecipe: false,
  recipe: {},
  recommended: [],
  isRecommendedFetched: false,
  startedRecipes: [],
  ingredients: [],
  isFavorite: null,
  randomRecommended: [],
};

function recipeDetailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCHING_RECIPE:
    return ({ ...state, isFetchingRecipe: true });
  case SUCCESS_RECIPE:
    return ({
      ...state,
      recipe: action.data[0],
      isRecommendedFetched: true,
      isFetchingRecipe: false,
    });
  case SUCCESS_RECOMMENDED:
    return ({ ...state, recommended: action.data });
  case SUCCESS_RANDOM_RECOMMENDED:
    console.log(action);
    return ({ ...state, randomRecommended: action.data });
  case SAVE_INGREDIENTS:
    return ({ ...state, ingredients: action.ingredients });
  default:
    return state;
  }
}

export default recipeDetailsReducer;
