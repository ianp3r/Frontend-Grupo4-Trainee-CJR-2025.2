"use client";

import { ChevronLeft, Star, CheckCircle2, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductImage {
  id: number;
  productId: number;
  url: string;
  alt_text?: string;
}

interface MainProduct {
  id: number;
  lojaId: number;
  categoriaId?: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  createdAt?: string;
  updatedAt?: string;
  images?: ProductImage[];
}

interface StoreProduct {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imageUrl: string | null;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<MainProduct | null>(null);
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeProductsLoading, setStoreProductsLoading] = useState(true);
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;

    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/produto/${resolvedParams.id}`);

        if (!res.ok) {
          router.push('/404');
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams, router]);

  useEffect(() => {
    if (!product) return;

    const fetchStoreProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        // Use the loja query parameter to fetch products from the same store
        const res = await fetch(`${apiUrl}/product?loja=${product.lojaId}`);

        if (!res.ok) {
          console.error('Error fetching store products');
          return;
        }

        const storeProductsData = await res.json();
        
        // Filter out the current product and map to StoreProduct format
        const sameStoreProducts = Array.isArray(storeProductsData)
          ? storeProductsData
              .filter((p: any) => p.id !== product.id)
              .map((p: any) => {
                // Construct full image URL
                let imageUrl = p.imagens?.[0]?.url || null;
                if (imageUrl && !imageUrl.startsWith('http')) {
                  imageUrl = `${apiUrl}${imageUrl}`;
                }
                
                return {
                  id: p.id,
                  nome: p.nome,
                  preco: p.preco,
                  estoque: p.estoque,
                  imageUrl: imageUrl,
                };
              })
          : [];

        setStoreProducts(sameStoreProducts);
      } catch (error) {
        console.error('Error fetching store products:', error);
      } finally {
        setStoreProductsLoading(false);
      }
    };

    fetchStoreProducts();
  }, [product]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Carregando produto...</p>
        </main>
      </div>
    );
  }

  const images = product.images || [];
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-cream">

      <Header />

      <main className="container mx-auto px-4 py-8">


        {/* --- MAIN CONTENT ---        */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-6 rounded-3xl">

          {/* LEFT COLUMN: IMAGES*/}
          <div className="flex flex-col-reverse lg:flex-row gap-4 items-start shrink-0">

            {/* Thumbnails Strip */}
            {hasImages && (
              <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full lg:w-auto justify-center lg:justify-start">
                {images.map((image) => (
                   <div
                    key={image.id}
                    className="w-20 h-20 lg:w-24 lg:h-24 border rounded-[20px] overflow-hidden cursor-pointer hover:border-purple-500 shrink-0 relative"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt_text || product.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Main Image Container */}
            <div className="flex-1 relative bg-gray-50 rounded-[30px] flex items-center justify-center w-full aspect-square lg:w-[432px] lg:h-[432px] lg:flex-none overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold z-10">
                CJR
              </div>
              {hasImages ? (
                <Image
                  src={images[0].url}
                  alt={images[0].alt_text || product.nome}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-3/4 h-3/4 bg-purple-600 rounded-md shadow-xl flex items-center justify-center text-white text-2xl font-bold">
                  Product Image
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: INFO*/}
          <div className="w-full lg:max-w-lg space-y-6 font-sans">
            <div>
              <h1 className="text-3xl font-medium text-black mb-2">{product.nome}</h1>

              {/* Rating Row */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-black font-bold ml-1">-</span>
                </div>
                <span>| - reviews</span>
                <span className="text-purple-500">Loja #{product.lojaId}</span>
                <span className="text-purple-500">{product.estoque} disponíveis</span>
              </div>
            </div>

            <div className="text-4xl font-medium mt-2! text-gray-900">
              R${(product.preco / 100).toFixed(2).replace('.', ',')}
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
              <h3 className="font-bold uppercase text-gray-500 text-xs mb-2">Descrição</h3>
              <p className="font-bold mb-2">{product.nome.toUpperCase()}</p>
              <p className="mb-4">{product.descricao || 'Sem descrição disponível.'}</p>
            </div>

          </div>
        </div>

        {/* --- 3. RELATED PRODUCTS (Da mesma loja) --- */}
        {!storeProductsLoading && storeProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-4xl font-medium mb-6 text-black font-[League_Spartan]">Da mesma loja</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
              {storeProducts.map((storeProduct) => (
                <Link 
                  key={storeProduct.id} 
                  href={`/produto/${storeProduct.id}`}
                  className="w-60 flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition h-full cursor-pointer">
                    <div className="h-40 bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
                      {storeProduct.imageUrl ? (
                        <img
                          src={storeProduct.imageUrl}
                          alt={storeProduct.nome}
                          className="w-full h-full object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x300/EFEFEF/333?text=Produto';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gray-300">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-lg text-black font-[League_Spartan] mb-2 truncate">
                      {storeProduct.nome}
                    </p>
                    <p className="font-bold text-gray-900 mb-2">
                      R${(storeProduct.preco / 100).toFixed(2).replace('.', ',')}
                    </p>
                    {storeProduct.estoque > 0 ? (
                      <span className="flex items-center text-xs text-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        DISPONÍVEL
                      </span>
                    ) : (
                      <span className="flex items-center text-xs text-red-500">
                        <XCircle className="h-3 w-3 mr-1" />
                        INDISPONÍVEL
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
