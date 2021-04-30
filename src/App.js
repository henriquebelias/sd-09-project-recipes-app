import React from 'react';
import './App.css';
import { Route } from 'react-router';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';
import Login from './Pages/Login/Login';
import MealsScreen from './Pages/MealsScreen/MealsScreen';
import DrinksScreen from './Pages/DrinkScreen/DrinksScreen';
import ExploreScreen from './Pages/exploreScreen/exploreScreen';
import ExploreFoodScreen from './Pages/ExploreFoodOrDrink/exploreFoodOrDrink';
import ExploreForIngredient from './Pages/ExploreForIngredient/ExploreForIngredient';
import ExploreForArea from './Pages/ExploreForArea/ExploreForArea';
import ProfileScreen from './Pages/ProfileScreen/ProfileScreen';
import
FavoriteRecipiesScreen from './Pages/FavoriteRecipiesScreen/FavoriteRecipiesScreeen';
import DoneRecipiesScreen from './Pages/DoneRecipesScreen/DoneRecipiesScreen';
import RecipeDetailsScreen from './Pages/RecipeDetailsScreen/RecipeDetailsScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MealsScreen } />
      <Route exact path="/bebidas" component={ DrinksScreen } />
      <Route exact path="/comidas/:id" component={ RecipeDetailsScreen } />
      <Route exact path="/bebidas/:id" component={ RecipeDetailsScreen } />
      <Route exact path="/explorar" component={ ExploreScreen } />
      <Route exact path="/explorar/:pageType" component={ ExploreFoodScreen } />
      <Route
        exact
        path="/explorar/:pageType/ingredientes"
        component={ ExploreForIngredient }
      />
      <Route
        exact
        path="/explorar/:pageType/area"
        component={ ExploreForArea }
      />
      <Route exact path="/perfil" component={ ProfileScreen } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipiesScreen } />
      <Route exact path="/receitas-feitas" component={ DoneRecipiesScreen } />
    </Switch>
  );
}

export default App;
