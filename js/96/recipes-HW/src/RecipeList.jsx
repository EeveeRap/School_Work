import PropTypes from 'prop-types'

export default function RecipeList(props) {
  const recipeJsx = props.recipes?.length
    ? props.recipes.map((r, index) => <li key={r.id} onClick={() => props.selectRecipe(index)}>{r.theName}</li>)
    : <h2>loading...</h2>;

  return (
    <ul className="bulletless">
      {recipeJsx}
    </ul>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      theName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  selectRecipe: PropTypes.func.isRequired
}