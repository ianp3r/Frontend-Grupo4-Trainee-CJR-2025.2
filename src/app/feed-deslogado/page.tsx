"use client";

import React from 'react';
import Image from 'next/image';
import mascote from '@/assets/mascote_01.png';
import logo from '@/assets/LOGO Stock.io.png'
import {
  ShoppingCart,
  Menu,
  Search,
  ArrowRight,
  ChevronDown,
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
} from 'lucide-react';

import type { Icon as LucideIcon } from 'lucide-react';

interface Category {
  name: string;
  icon: typeof LucideIcon; 
  color: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  available: boolean;
  imageUrl: string;
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
}

const categories: Category[] = [
  { name: 'Mercado', icon: ShoppingBag, color: 'text-green-600' },
  { name: 'Farmácia', icon: HeartPulse, color: 'text-blue-600' },
  { name: 'Bebidas', icon: Wine, color: 'text-yellow-600' },
  { name: 'Moda', icon: Shirt, color: 'text-pink-600' },
  { name: 'Eletrônicos', icon: Laptop, color: 'text-indigo-600' },
  { name: 'Jogos', icon: Gamepad2, color: 'text-red-600' },
  { name: 'Brinquedos', icon: ToyBrick, color: 'text-purple-600' },
  { name: 'Casa', icon: Home, color: 'text-orange-600' },
];

const marketProducts: Product[] = [
  { id: 1, name: 'Brownie Meio A.', price: 'R$6,70', available: true, imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Brownie' },
  { id: 2, name: 'Redbull Trad.', price: 'R$5,41', available: false, imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Redbull' },
];

const beautyProducts: Product[] = [
  { id: 6, name: 'Limpador Facial', price: 'R$79,99', available: true, imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Produto' },
  { id: 7, name: 'Blush', price: 'R$199,99', available: false, imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Produto' },
];

const fashionProducts: Product[] = [
  { id: 11, name: 'Saia', price: 'R$379,99', available: true, imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Moda' },
  { id: 12, name: 'New Balance', price: 'R$399,99', available: true, imageUrl: 'https://placehold.co/300x300/EFEFEF/333?text=Moda' },
];

const stores: Store[] = [
  { id: 1, name: 'CJR', type: ' mercado', logo: 'CJR' },
  { id: 2, name: 'Rare Beauty', type: ' beleza', logo: 'RB' },
];

const Header = () => (
  <header className="bg-black text-white p-4">
    <div className="container mx-auto flex justify-between items-center max-w-7xl">
      <div className='w-[654px] h-[100%] flex flex-col'>
                <Image src={logo} alt='logo' />
            </div>
      <nav className="flex items-center gap-6">
        <button className="relative" aria-label="Carrinho">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 h-4 w-4 bg-purple-600 rounded-full text-xs flex items-center justify-center">
          </span>
        </button>
        <button className="text-sm font-semibold tracking-wider hover:text-gray-300">
          LOGIN
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 px-5 rounded-full transition-colors">
          CADASTRE-SE
        </button>
      </nav>
    </div>
  </header>
);

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

const SearchBar = () => (
  <div className="container mx-auto p-4 max-w-7xl">
    <div className="relative">
      <input
        type="text"
        placeholder="Procurar por..."
        className="w-full p-4 pl-12 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
    </div>
  </div>
);

const CategoryList = () => (
  <section className="container mx-auto p-4 max-w-7xl">
    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Categoria</h3>
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <a
            key={category.name}
            href="#"
            className="flex flex-col items-center gap-2 w-24 flex-shrink-0 group"
          >
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
              <Icon className={`h-8 w-8 ${category.color}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">
              {category.name}
            </span>
          </a>
        );
      })}
    </div>
  </section>
);

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md">
    <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { // Tipagem do evento
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.className = 'w-full h-40 bg-gray-100 flex items-center justify-center';
          placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-10 w-10 text-gray-300"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
          if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.appendChild(placeholder);
          }
        }}
      />
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
);

const ProductRow = ({ title, tag, products, tagColor = 'purple' }: ProductRowProps) => {
  // Mapeamento de cores
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
        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1">
          ver mais
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const StoreList = () => (
  <section className="container mx-auto p-4 max-w-7xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold text-gray-900">Lojas</h3>
      <div className="flex gap-4">
        <button className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1">
          filtros
          <ChevronDown className="h-4 w-4" />
        </button>
        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1">
          ver mais
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
    <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
      {stores.map((store) => (
        <a
          key={store.id}
          href="#"
          className="flex flex-col items-center gap-3 w-20 flex-shrink-0 group"
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 group-hover:shadow-md transition-shadow">
            {store.logo}
          </div>
          <div className="text-center">
            <span className="break-keep text-sm font-semibold text-gray-800 display-block">
              {store.name}
            </span>
            <span className="break-keep text-xs text-gray-500 capitalize display-block">
              {store.type}
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

// --- Main Page Component ---

export default function Page() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <Header />
      <main>
        <Hero />
        <SearchBar />
        <CategoryList />
        
        <div className="py-6 space-y-8">
          <ProductRow
            title="Produtos"
            tag="em Mercado"
            products={marketProducts}
            tagColor="green"
          />
          <ProductRow
            title="Produtos"
            tag="em Beleza"
            products={beautyProducts}
            tagColor="pink"
          />
          <ProductRow
            title="Produtos"
            tag="em Moda"
            products={fashionProducts}
            tagColor="purple"
          />
        </div>

        <StoreList />
      </main>
      
      <footer className="bg-purple-800 text-purple-300 p-8 mt-12">
        <div className="container mx-auto max-w-7xl text-center">
          <p>&copy; {new Date().getFullYear()} Grupo 4 Ciclopes</p>
        </div>
      </footer>
    </div>
  );
}