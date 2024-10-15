import Link from 'next/link';
import { Search, Menu, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  return (
    <header className="bg-gray-100 bg-opacity-80 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-3xl font-bold">
            lovebuy
          </Link>
          <span className="text-sm italic font-serif text-gray-600">
            empower the customer - make shopping great again
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64"
            />
            <Button size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button size="icon" variant="ghost">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/washing-machines" className="text-lg font-medium">
                  Washing Machines
                </Link>
                <Link href="/luggage" className="text-lg font-medium">
                  Luggage
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}