export default function Main() {
  return (
    <main>
      <form className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          className="new-ingredient"
          id="ingredient"
          name="ingredient"
        />
        <button className="dark-btn">Add ingredient</button>
      </form>
    </main>
  )
}