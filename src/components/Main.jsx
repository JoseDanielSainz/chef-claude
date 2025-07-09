import React from "react"
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from '../ai.js'
import Markdown from 'react-markdown'

export default function Main() {
  const [ingredients, setIngredients] = React.useState(['chicken', 'all the main spices', 'corn', 'heavy cream', 'pasta'])
  const [recipe, setRecipe] = React.useState('')
  const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if (recipe !== '' && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [recipe])

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
    console.log(recipeMarkdown)
  }

  function addIngredient(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 &&
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
        />
      }

      {recipe && <ClaudeRecipe recipe={recipe} />}

    </main>
  )
}