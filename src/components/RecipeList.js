import Recipe from './Recipe'
import Masonry from 'react-masonry-css'

export default function RecipeList({recipes, filteredRecipes}) {
  const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  800: 2,
  600: 1
};
  return (
    <>
   <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
      {filteredRecipes.map(recipe => {
        return <Recipe key={recipe.id} {...recipe}/>
      })}
    </Masonry>
    </>
  )
}
