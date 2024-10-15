"use client"

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterSectionProps {
  onClose: () => void;
  options: {
    brands: string[];
    features: string[];
  };
  onFilterChange: (preferences: any) => void;
}

export default function FilterSection({ onClose, options, onFilterChange }: FilterSectionProps) {
  const [budget, setBudget] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [specialFeatures, setSpecialFeatures] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      budget: budget[1],
      brands: selectedBrands,
      features: specialFeatures,
    });
  }, [budget, selectedBrands, specialFeatures]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleFeatureChange = (feature: string) => {
    setSpecialFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* ... (keep the existing JSX) */}
    </div>
  );
}