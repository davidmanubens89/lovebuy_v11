from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class RecommendationRequest(BaseModel):
    product_type: str
    user_preferences: dict

class Product(BaseModel):
    name: str
    brand: str
    price: float
    rating: float
    features: List[str]

class RecommendationResponse(BaseModel):
    products: List[Product]

@app.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    try:
        # Prepare the prompt for ChatGPT
        prompt = f"Recommend 5 {request.product_type} based on these preferences: {request.user_preferences}. For each product, provide the name, brand, price, rating (out of 5), and a list of key features. Format the response as a Python list of dictionaries."

        # Call the ChatGPT API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful product recommendation assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        # Parse the ChatGPT response
        recommendations = eval(response.choices[0].message.content)

        # Convert the recommendations to Product objects
        products = [Product(**product) for product in recommendations]

        return RecommendationResponse(products=products)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)