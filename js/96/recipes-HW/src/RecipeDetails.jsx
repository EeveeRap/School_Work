import List from './List';
import { useState } from 'react';
import PropTypes from 'prop-types'

export default function RecipeDetails(props) {
  const [state, setState] = useState({
    pictureShowing: true
  });

  const { name, ingredients, directions, picture } = props.recipe;
  const { pictureShowing } = state;

  return (
    <>
      <h2>{name}</h2>
      <button onClick={() => setState({ ...state, pictureShowing: !state.pictureShowing })}>{pictureShowing ? 'hide' : 'show'}</button>
      <br />
      {pictureShowing
        ? <img src={picture} style={{ width: '200px' }} />
        : null}
      <List name="ingredients" items={ingredients} />
      <List name="directions" items={directions} />
    </>
  );
}
RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string).isRequired,
    picture: PropTypes.string.isRequired
  })
};