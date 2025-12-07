"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import mascote from '@/assets/mascote_01.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ShoppingCart,
  User,
  Menu,
  Search,
  ArrowRight,
  ChevronDown,
  ChevronUp,
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

// Helper to fetch with auth token
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  const headers = {
    ...options.headers,
  } as Record<string, string>;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

interface Category {
  id: number;
  name: string;
  icon: typeof LucideIcon;
  color: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  available: boolean;
  imageUrl: string | null;
}

interface Store {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface ProductCardProps {
  product: Product;
}

type TagColor = 'purple' | 'green' | 'pink';

interface ProductRowProps {
  title: string;
  tag: string;
  products: Product[];
  tagColor?: TagColor;
  categoryId?: number;
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

const categoryTagColors: Record<string, TagColor> = {
  'Mercado': 'green',
  'Farmácia': 'green',
  'Bebidas': 'purple',
  'Moda': 'pink',
  'Roupas': 'pink',
  'Eletrônicos': 'purple',
  'Jogos': 'purple',
  'Brinquedos': 'pink',
  'Casa': 'green',
  'Livros': 'purple',
  'Esportes': 'green',
  'Alimentos': 'green',
  'Alimentação': 'green',
  'Café': 'purple',
  'Ferramentas': 'purple',
  'Automotivo': 'purple',
  'Música': 'pink',
  'Jardim': 'green',
  'Beleza': 'pink',
  'Cabelo': 'pink',
  'Arte': 'purple',
  'Relógios': 'purple',
  'Bebê': 'pink',
  'Pet': 'green',
  'Pets': 'green',
};

const Hero = () => (
  <section className="bg-black text-white">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-8 md:p-12 max-w-7xl">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold max-w-md leading-tight">
          Do CAOS à organização, em alguns cliques
        </h2>
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="relative w-[496px] h-[300px] rounded-lg overflow-hidden">
          <Image
            src={mascote}
            alt="Mascote"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);


const CategoryList = ({ categories }: { categories: Category[] }) => (
  <section className="container mx-auto p-4 max-w-7xl">
    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Categoria</h3>
    {categories.length > 0 ? (
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              href={`/categoria/${category.id}`}
              className="flex flex-col items-center gap-2 w-24 flex-shrink-0 group"
            >
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                <Icon className={`h-8 w-8 ${category.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">Nenhuma categoria disponível</p>
    )}
  </section>
);

const ProductCard = ({ product }: ProductCardProps) => (
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

const ProductRow = ({ title, tag, products, tagColor = 'purple', categoryId }: ProductRowProps) => {
  const colors: Record<TagColor, string> = {
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    pink: 'bg-pink-100 text-pink-800',
  };
  const tagClass = colors[tagColor] || colors.purple;

  return (
    <section className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tagClass}`}
          >
            {tag}
          </span>
        </div>
        {categoryId && (
          <Link href={`/categoria/${categoryId}`} className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1">
            ver mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
        {products.map((product) => (
          <div key={product.id} className="w-60 flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const FilterMenu = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
      >
        filtros
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-lg bg-white shadow-lg border border-gray-100 z-10">
          <div className="w-full flex justify-between items-center p-4 text-purple-600">
            <span className="font-semibold text-xl">filtros</span>
            <button onClick={() => setIsOpen(false)}>
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 pb-4 pt-0 space-y-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <label
                  key={category.name}
                  htmlFor={`filter-store-${category.name}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`filter-store-${category.name}`}
                    className="h-6 w-6 rounded-lg border-gray-300 text-purple-600 focus:ring-purple-500"
                    style={{ accentColor: '#7C3AED' }}
                  />
                  <Icon className="h-5 w-5 text-gray-600" /> 
                  <span className="text-gray-800 text-lg">
                    {category.name}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const StoreList = ({ categories, stores }: { categories: Category[]; stores: Store[] }) => (
  <section className="container mx-auto p-4 max-w-7xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold text-gray-900">Lojas</h3>
    </div>

    {stores.length > 0 ? (
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/loja?id=${store.id}`}
            className="flex flex-col items-center gap-3 w-20 flex-shrink-0 group"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden text-xl font-bold text-gray-600 group-hover:shadow-md transition-shadow">
              {store.logo ? (
                <img 
                  src={store.logo} 
                  alt={store.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerText = store.name.substring(0, 2).toUpperCase();
                  }}
                />
              ) : (
                store.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="text-center">
              <span className="break-keep text-sm font-semibold text-gray-800 display-block">
                {store.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm">Nenhuma loja disponível</p>
    )}
  </section>
);

// conteudo principal

export default function Page() {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, { products: Product[], categoryId: number }>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
        
        // Fetch categories
        const categoriesResponse = await fetch(`${API_URL}/categories`);
        const categoriesData = await categoriesResponse.json();
        
        // Transform categories to include icons and colors (show first 8)
        const transformedCategories: Category[] = categoriesData
          .slice(0, 8)
          .map((cat: any) => {
            const { icon, color } = getCategoryIconAndColor(cat.nome);
            return {
              id: cat.id,
              name: cat.nome,
              icon,
              color,
            };
          });
        
        setCategories(transformedCategories);
        
        // Fetch products from the product endpoint
        const response = await fetch(`${API_URL}/product`);
        const productsArray = await response.json();
        
        // Group products by category
        const transformedData: Record<string, { products: Product[], categoryId: number }> = {};
        
        // Ensure productsArray is an array
        if (Array.isArray(productsArray)) {
          productsArray.forEach((product: any) => {
            const categoryName = product.categoria?.nome || 'Sem Categoria';
            const categoryId = product.categoria?.id || 0;
            
            if (!transformedData[categoryName]) {
              transformedData[categoryName] = { products: [], categoryId };
            }
            
            transformedData[categoryName].products.push({
              id: product.id,
              name: product.nome,
              price: `R$${(product.preco / 100).toFixed(2).replace('.', ',')}`,
              available: product.estoque > 0,
              imageUrl: product.imagens?.[0]?.url || 'https://placehold.co/300x300/EFEFEF/333?text=Produto',
            });
          });
        }
        
        setProductsByCategory(transformedData);

        // Fetch stores
        const storesResponse = await fetch(`${API_URL}/loja`);
        const storesData = await storesResponse.json();
        
        // Transform stores data
        const transformedStores: Store[] = (Array.isArray(storesData) ? storesData : []).map((store: any) => ({
          id: store.id,
          name: store.nome,
          type: store.descricao || 'loja',
          logo: store.logo_url || store.sticker_url || '',
        }));
        
        setStores(transformedStores);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Hero />
        <CategoryList categories={categories} />
        
        <div className="py-6 space-y-8">
          {loading ? (
            <div className="container mx-auto p-4 max-w-7xl text-center">
              <p className="text-gray-600">Carregando produtos...</p>
            </div>
          ) : (
            Object.keys(productsByCategory).length > 0 ? (
              Object.entries(productsByCategory).map(([categoryName, categoryData]) => {
                if (categoryData.products.length === 0) return null;
                
                const tagColor = categoryTagColors[categoryName] || 'purple';
                
                return (
                  <ProductRow
                    key={categoryName}
                    title="Produtos"
                    tag={`em ${categoryName}`}
                    products={categoryData.products}
                    tagColor={tagColor}
                    categoryId={categoryData.categoryId}
                  />
                );
              })
            ) : (
              <div className="container mx-auto p-4 max-w-7xl text-center">
                <p className="text-gray-600">Nenhum produto disponível no momento.</p>
              </div>
            )
          )}
        </div>

        <StoreList categories={categories} stores={stores} />
      </main>
      <Footer />
    </div>
  );
}
