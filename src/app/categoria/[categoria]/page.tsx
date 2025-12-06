"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { XCircle, CheckCircle2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  available: boolean;
  imageUrl: string | null;
}

interface ProductCardProps {
  product: Product;
}

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

export default function CategoryPage({ params }: { params: Promise<{ categoria: string }> }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const resolvedParams = React.use(params);
  const categoryName = decodeURIComponent(resolvedParams.categoria);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
        const response = await fetch(`${API_URL}/product`);
        const productsArray = await response.json();
        
        // Filter products by category
        const filteredProducts = Array.isArray(productsArray) 
          ? productsArray
              .filter((product: any) => product.categoria?.nome === categoryName)
              .map((product: any) => {
                // Construct full image URL
                let imageUrl = product.imagens?.[0]?.url || null;
                if (imageUrl && !imageUrl.startsWith('http')) {
                  imageUrl = `${API_URL}${imageUrl}`;
                }
                
                return {
                  id: product.id,
                  name: product.nome,
                  price: `R$${(product.preco / 100).toFixed(2).replace('.', ',')}`,
                  available: product.estoque > 0,
                  imageUrl: imageUrl,
                };
              })
          : [];
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="container mx-auto p-4 max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Produtos em {categoryName}</h1>
          <p className="text-gray-600">{products.length} {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando produtos...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
