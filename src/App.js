import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import { RecipeContextProvider } from './contexts/recipeContext';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinksRecipe from './pages/DrinksRecipe';
import FoodRecipeInProgress from './pages/FoodRecipeInProgress';
import DrinkRecipeInProgress from './pages/DrinkRecipeInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodsByIngredient from './pages/FoodsByIngredient';
import DrinksByIngredient from './pages/DrinksByIngredient';
import ExploreOriginFood from './pages/ExploreOriginFood';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipeContextProvider>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/comidas" exact component={ Foods } />
        <Route path="/bebidas" exact component={ Drinks } />
        <Route path="/comidas/:id" render={ (props) => <FoodRecipe { ...props } /> } />
        <Route path="/bebidas/:id" component={ DrinksRecipe } />
        <Route path="/comidas/:id/in-progress" component={ FoodRecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkRecipeInProgress } />
        <Route path="/explorar" exact component={ Explore } />
        <Route path="/explorar/comidas" exact component={ ExploreFoods } />
        <Route path="/explorar/bebidas" exact component={ ExploreDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          exact
          component={ FoodsByIngredient }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          exact
          component={ DrinksByIngredient }
        />
        <Route path="/explorar/comidas/area" exact component={ ExploreOriginFood } />
        <Route path="/perfil" exact component={ Profile } />
        <Route path="/receitas-feitas" exact component={ RecipesMade } />
        <Route path="/receitas-favoritas" exact component={ FavoriteRecipes } />
      </Switch>
    </RecipeContextProvider>
  );
}

export default App;
