"use client"

import { useState, useEffect } from 'react';
import { RecommendationPage } from '@/components/RecommendationPage';
import { getRecommendations } from '@/lib/api';
import { Scale, Zap, Repeat, Volume2 } from 'lucide-react';

const keyFactors = [
  { title: 'Capacity', description: 'Choose based on your laundry needs', icon: 'Scale', hoverText: 'Consider the size of your typical laundry loads when selecting capacity.' },
  { title: 'Energy Efficiency', description: 'Look for energy-saving features', icon: 'Zap', hoverText: 'Energy-efficient models can help reduce your electricity bills and environmental impact.' },
  { title: 'Wash Cycles', description: 'Various cycles for different fabrics', icon: 'Repeat', hoverText: 'More wash cycles provide greater flexibility for handling different types of clothing.' },
  { title: 'Noise Level', description: 'Consider quieter models', icon: 'Volume2', hoverText: 'Lower noise levels are important if your laundry area is near living spaces.' },
];

const interestingFacts = [
  { text: 'The first electric-powered washing machine was invented in 1908.', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80' },
  { text: 'An average washing machine uses about 41 gallons of water per load.', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80' },
  { text: 'Some modern washing machines can be controlled via smartphone apps.', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80' },
];

const filterOptions = {
  brands: ['Samsung', 'LG', 'Whirlpool', 'Maytag', 'GE'],
  features: ['Steam Clean', 'Smart Connectivity', 'Energy Star Certified', 'Large Capacity', 'Quiet Operation'],
};

export default function WashingMachines() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const recommendations = await getRecommendations('washing-machines', {});
        if (Array.isArray(recommendations) && recommendations.length > 0) {
          setProducts(recommendations);
          setError(null);
          setUsingFallback(false);
        } else {
          throw new Error('No recommendations received');
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load personalized recommendations. Showing default options.');
        setUsingFallback(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <>
      {error && (
        <div className="container mx-auto px-4 py-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p>{error}</p>
        </div>
      )}
      <RecommendationPage
        title="Washing Machine Recommendations"
        keyFactors={keyFactors}
        products={products}
        interestingFacts={interestingFacts}
        filterOptions={filterOptions}
      />
    </>
  );
}