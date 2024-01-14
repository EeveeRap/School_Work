import './App.css'
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    selectedRecipeIndex: 1,
    recipes: [
      {
        "id": 1,
        "theName": "chulent",
        "ingredients": [
          "meat",
          "potatoes",
          "all sorts of beans"
        ],
        "directions": [
          "add ingredients to pot",
          "cook overnight"
        ],
        "picture": "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=90/media/photosV2/2abd914f-1e0e-4eaf-9c61-ab35e21f0bec-retina-large.jpg"
      },
      {
        "id": 2,
        "theName": "scrambled eggs",
        "ingredients": [
          "eggs",
          "salt",
          "pepper"
        ],
        "directions": [
          "mix ingredients",
          "fry"
        ],
        "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWnwZ4KOcp-a7R7C2OGupFHsLu4tmzLstcwg&usqp=CAU"
      }
    ]
  });


  const selectRecipe = index => {
    setState({
      ...state,
      selectedRecipeIndex: index
    });
  };


  const { recipes, selectedRecipeIndex } = state;
  const selectedRecipe = recipes[selectedRecipeIndex];

  const recipeDetailJsx = selectedRecipe ? <RecipeDetails recipe={selectedRecipe} /> : <h2>loading...</h2>;

  return (
    <div className="container text-center">
      <h1>PCS Recipes</h1>
      <RecipeList recipes={state.recipes} selectRecipe={selectRecipe} />
      <hr />
      {recipeDetailJsx}
    </div>
  )
}
export default App