import React, { useEffect, useState/* , useContext */ } from 'react';
import { useLocation/* , useHistory */ } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import getIngredients from '../services/ingredientsAPI';
/* import Loading from '../components/Loading'; */
import '../styles/ExplorarIngredientes.css';
// import { RecipesContext } from '../context';

function ExplorarIngredientes() {
  const [ingredientsList, setIngredientsList] = useState();
  const { pathname } = useLocation();
  const type = pathname.includes('comidas')
    ? ['comidas', 'strIngredient', 'https://www.themealdb.com/images/ingredients/']
    : ['bebidas', 'strIngredient1', 'https://www.thecocktaildb.com/images/ingredients/'];
  const [loading, setLoading] = useState(true);

  const MAX_PG = 12;
  // const history = useHistory();
  // const { actions: { setIngredient } } = useContext(RecipesContext);

  useEffect(() => {
    const loadIngredients = () => {
      getIngredients(type[0])
        .then(
          (resp) => setIngredientsList(resp),
          (error) => console.log(error.message),
        )
        .finally(() => setLoading(false));
    };
    loadIngredients();
  }, []);

  /*   const handleClick = (searchIng) => {
    console.log(searchIng);
    setIngredient(searchIng);
    history.push('/comidas');
  };

  /*   function renderCardIngredients() {
    return ingredientsList
      .filter((_, index) => index < MAX_PG)
      .map((ing, index) => (
        <section
          key={ ing[type[1]] }
          data-testid={ `${index}-ingredient-card` }
          className="recipe-card"
          onClick={ () => handleClick(ing[type[1]]) }
          role="link"
          aria-hidden="true"
        >
          <img
            src={ `${imgURL}${ing[type[1]]}-Small.png` }
            alt={ `imagem de ${ing}` }
            data-testid={ `${index}-card-img` }
            className=".card__image"
          />
          <p data-testid={ `${index}-card-name` }>
            {ing[type[1]]}
          </p>

        </section>
      ));
  } */

  function loadCocktails() {

  }

  function loadMeals() {

  }

  return !loading ? (
    <>
      <Header />
      { ingredientsList
        .filter((_, index) => index < MAX_PG)
        .map((ing, index) => (
          <section
            key={ ing[type[1]] }
            data-testid={ `${index}-ingredient-card` }
            className="recipe-card"
            /* onClick={ () => handleClick(ing[type[1]]) } */
            role="link"
            aria-hidden="true"
          >
            <img
              src={ `${type[2]}${ing[type[1]]}-Small.png` }
              alt={ `imagem de ${ing}` }
              data-testid={ `${index}-card-img` }
              className=".card__image"
            />
            <p data-testid={ `${index}-card-name` }>
              {ing[type[1]]}
            </p>

          </section>
        ))}
      <Footer />
    </>
  ) : <p>Carregando...</p>;
}

export default ExplorarIngredientes;
