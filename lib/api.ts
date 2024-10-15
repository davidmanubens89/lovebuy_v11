import axios from 'axios';

export async function getRecommendations(productType: string, userPreferences: any) {
  try {
    const response = await axios.post('/api/recommendations', {
      product_type: productType,
      user_preferences: userPreferences,
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
}