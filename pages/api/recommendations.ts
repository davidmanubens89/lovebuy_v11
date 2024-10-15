import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  features: string[];
  image: string;
}

function stripMarkdown(text: string): string {
  return text.replace(/```json\n?|\n?```/g, '').trim();
}

function isValidProductArray(data: any): data is Product[] {
  return Array.isArray(data) && data.every(item =>
    typeof item === 'object' &&
    typeof item.name === 'string' &&
    typeof item.brand === 'string' &&
    (typeof item.price === 'number' || typeof item.price === 'string') &&
    typeof item.rating === 'number' &&
    Array.isArray(item.features)
  );
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "EcoWash Pro",
    brand: "GreenTech",
    price: 599.99,
    rating: 4.5,
    features: ["Energy-efficient", "Large capacity", "Smart connectivity"],
    image: "https://source.unsplash.com/300x200/?washing-machine"
  },
  {
    id: 2,
    name: "UltraClean 3000",
    brand: "CleanMaster",
    price: 499.99,
    rating: 4.3,
    features: ["Multiple wash cycles", "Quiet operation", "Stainless steel drum"],
    image: "https://source.unsplash.com/300x200/?laundry"
  },
  {
    id: 3,
    name: "SmartWash Deluxe",
    brand: "TechHome",
    price: 749.99,
    rating: 4.7,
    features: ["AI-powered washing", "Steam cleaning", "Mobile app control"],
    image: "https://source.unsplash.com/300x200/?smart-appliance"
  },
  {
    id: 4,
    name: "EconoWash Basic",
    brand: "BudgetAppliances",
    price: 349.99,
    rating: 4.0,
    features: ["Compact design", "Energy-saving mode", "Easy-to-use controls"],
    image: "https://source.unsplash.com/300x200/?compact-washer"
  },
  {
    id: 5,
    name: "LuxeClean 5000",
    brand: "PremiumHome",
    price: 999.99,
    rating: 4.8,
    features: ["Premium build quality", "Advanced stain removal", "Customizable wash programs"],
    image: "https://source.unsplash.com/300x200/?luxury-appliance"
  }
];

async function getRecommendationsFromChatGPT(productType: string, preferences: any): Promise<Product[]> {
  const prompt = `Recommend 5 ${productType} based on these preferences: ${JSON.stringify(preferences)}. For each product, provide the name, brand, price (as a number), rating (out of 5), and a list of key features. Format the response as a JSON array of objects. Do not include any explanatory text outside the JSON array.`;

  const logMessage = `Prompt sent to ChatGPT: ${prompt}\n\n`;
  fs.appendFileSync(path.join(process.cwd(), 'chatgpt_log.txt'), logMessage);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful product recommendation assistant. Always respond with a valid JSON array of product objects." },
        { role: "user", content: prompt }
      ],
    });

    const responseContent = response.data.choices[0].message?.content || '[]';
    const responseMessage = `Response from ChatGPT: ${responseContent}\n\n`;
    fs.appendFileSync(path.join(process.cwd(), 'chatgpt_log.txt'), responseMessage);

    const strippedContent = stripMarkdown(responseContent);
    let recommendations: any;

    try {
      recommendations = JSON.parse(strippedContent);
    } catch (parseError) {
      console.error('Error parsing ChatGPT response:', parseError);
      fs.appendFileSync(path.join(process.cwd(), 'chatgpt_log.txt'), `Parse error: ${parseError.message}\n\n`);
      return fallbackProducts;
    }

    if (!isValidProductArray(recommendations)) {
      console.error('Invalid product array structure');
      fs.appendFileSync(path.join(process.cwd(), 'chatgpt_log.txt'), `Invalid product array structure\n\n`);
      return fallbackProducts;
    }

    return recommendations.map((product, index) => ({
      ...product,
      id: index + 1,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : product.price,
      features: Array.isArray(product.features) ? product.features : [],
      image: `https://source.unsplash.com/300x200/?${encodeURIComponent(productType)}`,
    }));
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    fs.appendFileSync(path.join(process.cwd(), 'chatgpt_log.txt'), `Error: ${error.message}\n${error.stack}\n\n`);
    return fallbackProducts;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { product_type, user_preferences } = req.body;
      const recommendations = await getRecommendationsFromChatGPT(product_type, user_preferences);
      res.status(200).json({ products: recommendations });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'An error occurred while fetching recommendations', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}