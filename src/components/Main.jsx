import { useState } from 'react'

export default function Main() {


  const [ingredients, setIngredients] = useState([])

  const ingredientsListItems = ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))

  function handleSubmit(e) {



    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])
  }

  return (
    <main>
      <form className="add-ingredient-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          className="new-ingredient"
          id="ingredient"
          name="ingredient"
        />
        <button className="dark-btn" >Add ingredient</button>
      </form>
      <ul>
        {ingredientsListItems}

      </ul>
    </main>
  )
}