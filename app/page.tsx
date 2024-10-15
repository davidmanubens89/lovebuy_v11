import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HomeBanner } from '@/components/HomeBanner';

const productCategories = [
  { name: 'Washing Machines', description: 'Find the perfect washing machine for your home!', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80', link: '/washing-machines' },
  { name: 'Luggage', description: 'Discover the ideal luggage for your travels!', image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80', link: '/luggage' },
];

const latestNews = [
  { title: 'Top 10 Washing Machine Features', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80', description: 'Discover the must-have features for your next washing machine...' },
  { title: 'Luggage Trends for 2024', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80', description: 'Stay ahead of the curve with these upcoming luggage trends...' },
  { title: 'Eco-Friendly Laundry Tips', image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80', description: 'Learn how to reduce your environmental impact while doing laundry...' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeBanner />
      
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productCategories.map((category, index) => (
            <Link href={category.link} key={index}>
              <Card>
                <CardContent className="p-4">
                  <Image src={category.image} alt={category.name} width={300} height={200} className="w-full h-48 object-cover mb-4 rounded" />
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p>{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Image src={news.image} alt={news.title} width={300} height={200} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                <p>{news.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}