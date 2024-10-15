import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number | string;
  rating: number;
  features: string[];
  image: string;
}

export function ProductCard({ id, name, brand, price, rating, features = [], image }: ProductCardProps) {
  // Parse the price to ensure it's a number
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="relative w-full pt-[75%] mb-4">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded absolute top-0 left-0"
            />
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{brand}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">
            {!isNaN(numericPrice) ? `$${numericPrice.toFixed(2)}` : 'Price not available'}
          </span>
          <span className="text-sm">★ {rating.toFixed(1)}</span>
        </div>
        <ul className="text-sm mb-4 flex-grow">
          {features.slice(0, 3).map((feature, index) => (
            <li key={`feature-${id}-${index}`} className="mb-1">• {feature}</li>
          ))}
        </ul>
        <Button className="w-full mt-auto">View Details</Button>
      </CardContent>
    </Card>
  );
}