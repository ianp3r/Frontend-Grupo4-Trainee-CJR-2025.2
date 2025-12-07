"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ShoppingBag,
  HeartPulse,
  Wine,
  Shirt,
  Laptop,
  Gamepad2,
  ToyBrick,
  Home,
  XCircle,
  CheckCircle2,
  Book,
  Dumbbell,
  Apple,
  Coffee,
  Wrench,
  Car,
  Music,
  Flower2,
  Scissors,
  Palette,
  Watch,
  Baby,
  Dog,
  Sparkles,
  Utensils,
} from 'lucide-react';

import type { Icon as LucideIcon } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  available: boolean;
  imageUrl: string | null;
}

interface Category {
  id: number;
  nome: string;
}

// Helper function to get icon and color for a category
const getCategoryIconAndColor = (categoryName: string): { icon: typeof LucideIcon; color: string } => {
  const categoryMap: Record<string, { icon: typeof LucideIcon; color: string }> = {
    'Mercado': { icon: ShoppingBag, color: 'text-green-600' },
    'Farmácia': { icon: HeartPulse, color: 'text-blue-600' },
    'Bebidas': { icon: Wine, color: 'text-yellow-600' },
    'Moda': { icon: Shirt, color: 'text-pink-600' },
    'Roupas': { icon: Shirt, color: 'text-pink-600' },
    'Eletrônicos': { icon: Laptop, color: 'text-indigo-600' },
    'Jogos': { icon: Gamepad2, color: 'text-red-600' },
    'Brinquedos': { icon: ToyBrick, color: 'text-purple-600' },
    'Casa': { icon: Home, color: 'text-orange-600' },
    'Livros': { icon: Book, color: 'text-blue-700' },
    'Esportes': { icon: Dumbbell, color: 'text-green-700' },
    'Alimentos': { icon: Apple, color: 'text-red-500' },
    'Alimentação': { icon: Utensils, color: 'text-orange-500' },
    'Café': { icon: Coffee, color: 'text-amber-700' },
    'Ferramentas': { icon: Wrench, color: 'text-gray-700' },
    'Automotivo': { icon: Car, color: 'text-slate-600' },
    'Música': { icon: Music, color: 'text-purple-500' },
    'Jardim': { icon: Flower2, color: 'text-green-500' },
    'Beleza': { icon: Sparkles, color: 'text-pink-500' },
    'Cabelo': { icon: Scissors, color: 'text-rose-500' },
    'Arte': { icon: Palette, color: 'text-violet-600' },
    'Relógios': { icon: Watch, color: 'text-gray-800' },
    'Bebê': { icon: Baby, color: 'text-blue-400' },
    'Pet': { icon: Dog, color: 'text-amber-600' },
    'Pets': { icon: Dog, color: 'text-amber-600' },
  };
  
  return categoryMap[categoryName] || { icon: ShoppingBag, color: 'text-gray-600' };
};

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={`/produto/${product.id}`} className="block h-full">
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md h-full cursor-pointer">
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x300/EFEFEF/333?text=Produto';
            }}
          />
        ) : (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gray-300">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-sm text-gray-800 truncate">{product.name}</h4>
        <p className="font-bold text-gray-900 mt-1">{product.price}</p>
        {product.available ? (
          <span className="flex items-center text-xs text-green-600 mt-2">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            DISPONÍVEL
          </span>
        ) : (
          <span className="flex items-center text-xs text-red-500 mt-2">
            <XCircle className="h-3 w-3 mr-1" />
            INDISPONÍVEL
          </span>
        )}
      </div>
    </div>
  </Link>
);

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categoryId) return;

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
        
        // Fetch category details
        const categoryResponse = await fetch(`${API_URL}/categories/${categoryId}`);
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);
        
        // Fetch all products
        const productsResponse = await fetch(`${API_URL}/product`);
        const productsData = await productsResponse.json();
        
        // Filter products by category
        const categoryProducts = productsData
          .filter((product: any) => product.categoriaId === parseInt(categoryId))
          .map((product: any) => ({
            id: product.id,
            name: product.nome,
            price: `R$${(product.preco / 100).toFixed(2).replace('.', ',')}`,
            available: product.estoque > 0,
            imageUrl: product.imagens?.[0]?.url || null,
          }));
        
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-red-600">Categoria não encontrada</p>
        </main>
        <Footer />
      </div>
    );
  }

  const { icon: Icon, color } = getCategoryIconAndColor(category.nome);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1">
        {/* Category Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <Icon className={`h-16 w-16 ${color}`} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{category.nome}</h1>
            <p className="text-gray-600 mt-2">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'} disponíveis
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto disponível nesta categoria.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
