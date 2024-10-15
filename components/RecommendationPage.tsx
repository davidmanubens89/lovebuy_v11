import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { KeyFactors } from '@/components/KeyFactors';
import FilterSection from '@/components/FilterSection';
import { ProductList } from '@/components/ProductList';
import { ComparisonTable } from '@/components/ComparisonTable';
import { AnimatedFactsBanner } from '@/components/AnimatedFactsBanner';
import { getRecommendations } from '@/lib/api';

interface RecommendationPageProps {
  title: string;
  keyFactors: Array<{
    title: string;
    description: string;
    icon: string;
    hoverText: string;
  }>;
  products: Array<{
    id: number;
    name: string;
    brand: string;
    price: number;
    rating: number;
    features: string[];
    image: string;
  }>;
  interestingFacts: Array<{
    text: string;
    image: string;
  }>;
  filterOptions: {
    brands: string[];
    features: string[];
  };
}

export function RecommendationPage({
  title,
  keyFactors,
  products,
  interestingFacts,
  filterOptions,
}: RecommendationPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [userPreferences, setUserPreferences] = useState({});

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (newPreferences: any) => {
    setUserPreferences({ ...userPreferences, ...newPreferences });
    // Apply filters here
    const filtered = products.filter(product => {
      if (newPreferences.budget && product.price > newPreferences.budget) return false;
      if (newPreferences.brands && newPreferences.brands.length && !newPreferences.brands.includes(product.brand)) return false;
      if (newPreferences.features && newPreferences.features.length && !newPreferences.features.some((f: string) => product.features.includes(f))) return false;
      return true;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      <KeyFactors factors={keyFactors} />

      <div className="mb-4">
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          {showFilters ? 'Hide Filters' : 'Refine Your Needs'}
        </Button>
      </div>

      <div className="flex">
        {showFilters && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setShowFilters(false)}></div>
            <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto">
              <FilterSection 
                onClose={() => setShowFilters(false)} 
                options={filterOptions}
                onFilterChange={handleFilterChange}
              />
            </div>
          </>
        )}

        <div className="w-full">
          <ProductList products={filteredProducts} totalModels={products.length} />
          <ComparisonTable products={filteredProducts} />
        </div>
      </div>

      <div className="mt-12">
        <AnimatedFactsBanner facts={interestingFacts} />
      </div>
    </div>
  );
}