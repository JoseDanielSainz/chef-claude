import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { HfInference } from '@huggingface/inference'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const HF_ACCESS_TOKEN = process.env.HG_ACCESS_TOKEN

const hf = new HfInference(HF_ACCESS_TOKEN)

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

app.use(cors())
app.use(express.json())

app.post('/api/get-recipe', async (req, res) => {
  const ingredients = req.body.ingredients

  try {
    const response = await hf.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `I have ${ingredients.join(',')}. Please give me a recipe!` },
      ],
      max_tokens: 1024,
    })

    res.json({ recipe: response.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch recipe' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})