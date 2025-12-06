"use client";

import React, { useState, useEffect } from 'react'; // Importado useState e useEffect
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import mascote from '@/assets/mascote_01.png';
import logo from '@/assets/LOGO Stock.io.png';
import {
  ShoppingCart,
  Search,
  ArrowRight,
  ChevronDown,
  ChevronUp, // Importado ChevronUp
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
    nome: string;
    preco: number; // in centavos
    estoque: number;
    imagens: { url_imagem: string; ordem: number }[];
    loja: { id: number; nome: string };
    categoria: { id: number; nome: string };
}

// Helper interface for display
interface ProductDisplay {
    id: number;
    name: string;
    price: string;
    available: boolean;
    imageUrl: string;
}interface Store {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface BackendLoja {
  id: number;
  nome: string;
  descricao?: string;
  logo_url?: string;
  usuarioId: number;
  banner_url?: string;
  sticker_url?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: ProductDisplay;
}

type TagColor = 'purple' | 'green' | 'pink';

interface ProductRowProps {
  title: string;
  tag: string;
  products: ProductDisplay[];
  tagColor?: TagColor;
  loading?: boolean;
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

// Products will be loaded via state management like in feed-logado

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
  <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md h-full">
    <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={160}
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

const StoreList = ({ stores, loading, error }: { stores: Store[], loading: boolean, error: string | null }) => (
  <section className="container mx-auto p-4 max-w-7xl">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-semibold text-gray-900">Lojas</h3>
      <div className="flex gap-4">

        <FilterMenu categories={categories} />
        
        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1">
          ver mais
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>

    {loading && <p className="text-gray-600">Carregando lojas...</p>}
    {error && <p className="text-red-500">Erro ao carregar lojas: {error}</p>}
    
    {!loading && !error && stores.length > 0 && (
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
          </div>
        </a>
        ))}
      </div>
    )}
  </section>
);

// --- Main Page Component ---

export default function Page() {
  const router = useRouter();
  
  // Check if user is authenticated and redirect to feed-logado
  useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      router.replace('/feed-logado');
    }
  }, [router]);

  // API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

  // State for Stores
  const [stores, setStores] = useState<Store[]>([]);
  const [storesLoading, setStoresLoading] = useState(true);
  const [storesError, setStoresError] = useState<string | null>(null);

  // State for Products (using mock data like feed-logado)
  const [marketProducts, setMarketProducts] = useState<ProductDisplay[]>([]);
  const [marketProductsLoading, setMarketProductsLoading] = useState(true);

  const [beautyProducts, setBeautyProducts] = useState<ProductDisplay[]>([]);
  const [beautyProductsLoading, setBeautyProductsLoading] = useState(true);

  // Helper function to convert backend product to display format
  const convertProductToDisplay = (product: Product): ProductDisplay => {
      return {
          id: product.id,
          name: product.nome,
          price: `R$${(product.preco / 100).toFixed(2).replace('.', ',')}`,
          available: product.estoque > 0,
          imageUrl: product.imagens?.[0]?.url_imagem || 'https://placehold.co/300x300/EFEFEF/333?text=Produto'
      };
  };

  // Fetch stores from API
  useEffect(() => {
    const fetchStores = async () => {
      setStoresLoading(true);
      setStoresError(null);
      try {
        const res = await fetch(`${API_URL}/loja`);
        if (!res.ok) {
          throw new Error(`Failed to fetch stores: ${res.status}`);
        }
        const backendData: BackendLoja[] = await res.json();
        // Map backend data to frontend interface
        const mappedStores: Store[] = backendData.map((loja: BackendLoja) => ({
          id: loja.id,
          name: loja.nome,
          type: loja.descricao || 'loja',
          logo: loja.logo_url || loja.nome.substring(0, 2)
        }));
        setStores(mappedStores);
      } catch (err: unknown) {
        setStoresError(err instanceof Error ? err.message : 'Unknown error fetching stores');
      } finally {
        setStoresLoading(false);
      }
    };

    // Fetch products from API by category
    const fetchProductsByCategory = async (categoryId: number) => {
        try {
            const response = await fetch(`${API_URL}/product/categoria/${categoryId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products: Product[] = await response.json();
            return products.map(convertProductToDisplay);
        } catch (error) {
            console.error(`Error fetching products for category ${categoryId}:`, error);
            return [];
        }
    };

    const loadProducts = async () => {
        // Market Products (categoria ID = 1)
        setMarketProductsLoading(true);
        const marketProducts = await fetchProductsByCategory(1);
        setMarketProducts(marketProducts);
        setMarketProductsLoading(false);

        // Beauty Products (categoria ID = 2)
        setBeautyProductsLoading(true);
        const beautyProducts = await fetchProductsByCategory(2);
        setBeautyProducts(beautyProducts);
        setBeautyProductsLoading(false);
    };

    fetchStores();
    loadProducts();
  }, [API_URL]);

  // Fashion Products state
  const [fashionProducts, setFashionProducts] = useState<ProductDisplay[]>([]);
  const [fashionProductsLoading, setFashionProductsLoading] = useState(true);

  // Fetch Fashion Products (categoria ID = 3) 
  useEffect(() => {
      const fetchFashionProducts = async () => {
          setFashionProductsLoading(true);
          try {
              const response = await fetch(`${API_URL}/product/categoria/3`);
              if (response.ok) {
                  const products: Product[] = await response.json();
                  setFashionProducts(products.map(convertProductToDisplay));
              }
          } catch (error) {
              console.error('Error fetching fashion products:', error);
          }
          setFashionProductsLoading(false);
      };
      
      fetchFashionProducts();
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <Header />
      <main>
        <Hero />
        <SearchBar />
        <CategoryList />
        
        <div className="py-6 space-y-8">
          {/* Market Products Row */}
          {marketProductsLoading && <p className="text-center text-gray-600">Carregando produtos de Mercado...</p>}
          {!marketProductsLoading && marketProducts.length > 0 && (
            <ProductRow
              title="Produtos"
              tag="em Mercado"
              products={marketProducts}
              tagColor="green"
            />
          )}

          {/* Beauty Products Row */}
          {beautyProductsLoading && <p className="text-center text-gray-600">Carregando produtos de Beleza...</p>}
          {!beautyProductsLoading && beautyProducts.length > 0 && (
            <ProductRow
              title="Produtos"
              tag="em Beleza"
              products={beautyProducts}
              tagColor="pink"
            />
          )}

          {/* Fashion Products Row (Real API Data) */}
          <ProductRow
            title="Produtos"
            tag="em Moda"
            products={fashionProducts}
            loading={fashionProductsLoading}
            tagColor="purple"
          />
        </div>

        <StoreList 
          stores={stores} 
          loading={storesLoading} 
          error={storesError} 
        />
      </main>
      
      <footer className="bg-purple-800 text-purple-300 p-8 mt-12">
        <div className="container mx-auto max-w-7xl text-center">
          <p>&copy; {new Date().getFullYear()} Grupo 4 Ciclopes</p>
        </div>
      </footer>
    </div>
  );
}