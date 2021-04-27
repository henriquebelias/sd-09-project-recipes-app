import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from './context';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            {/* <Route path="/comidas" component={ Foods } />
            <Route path="/bebidas" component={ Drinks } />
            <Route path="/comidas/:id" component={ FoodDetails } />
            <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
            <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
            <Route path="/explorar" component={ Explore } />
            <Route path="/explorar/comidas" component={ ExploreFood } />
            <Route path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route
              path="/explorar/comidas/ingredientes"
              component={ ExploreFoodIncredients }
            />
            <Route
              path="/explorar/bebidas/ingredientes"
              component={ ExploreDrinksIncredients }
            />
            <Route path="/explorar/comidas/area" component={ ExploreFoodArea } /> */}
            <Route path="/perfil" component={ Profile } />
            <Route path="/receitas-feitas" component={ DoneRecipes } />
            <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Layout>
  );
}
