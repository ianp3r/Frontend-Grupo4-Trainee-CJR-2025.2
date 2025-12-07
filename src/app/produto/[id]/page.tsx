'use client';

import { Star, CheckCircle2, XCircle, Edit } from 'lucide-react';
import Header from '@/components/Header';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import profilePicture from '@/assets/userimage.avif';
import Footer from '@/components/Footer';
import type { ProductReview } from '@/types';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import EditarProduto from '@/components/EditarProduto';

interface ProductImage {
  id: number;
  produtoId: number;
  url: string;
}

interface Product {
  id: number;
  lojaId: number;
  categoriaId?: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  createdAt?: string;
  updatedAt?: string;
  imagens?: ProductImage[];
}

interface StoreProductImage {
  url: string;
}

interface StoreProduct {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imagens?: StoreProductImage[];
}

interface StoreSummary {
  id: number;
  nome: string;
  produtos?: StoreProduct[];
}

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [store, setStore] = useState<StoreSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showEditarProduto, setShowEditarProduto] = useState(false);

  const fetchData = async () => {
    if (!id) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      // Get current user ID from JWT token
      const token = localStorage.getItem('authToken');
      let userId = null;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.sub || payload.id || payload.userId;
          setCurrentUserId(userId);
        } catch (err) {
          console.error('Error decoding token:', err);
        }
      }
      
      // Fetch product
      const productRes = await fetch(`${apiUrl}/produto/${id}`, { cache: 'no-store' });
      if (!productRes.ok) {
        setLoading(false);
        return;
      }
      const productData = await productRes.json();
      setProduct(productData);

      // Fetch reviews and store in parallel
      const [reviewsRes, storeRes] = await Promise.all([
        fetch(`${apiUrl}/product-reviews?produtoId=${id}`, { cache: 'no-store' }),
        fetch(`${apiUrl}/loja/${productData.lojaId}`, { cache: 'no-store' })
      ]);

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      }

      if (storeRes.ok) {
        const storeData = await storeRes.json();
        setStore(storeData);
        
        // Check if current user is the store owner
        if (userId && storeData.usuarioId === userId) {
          setIsOwner(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleRefreshProduct = () => {
    setLoading(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-2xl">Carregando produto...</p>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-2xl text-red-600">Produto não encontrado</p>
        </main>
      </div>
    );
  }

  const images = product.imagens || [];
  const hasImages = images.length > 0;
  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.nota, 0) / reviews.length
    : null;
  const storeName = store?.nome || `Loja #${product.lojaId}`;
  const latestReview = reviews.length
    ? [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;
  const relatedProducts = (store?.produtos || []).filter((p) => p.id !== product.id).slice(0, 4);

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
                      alt={product.nome}
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
                  alt={product.nome}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-3/4 h-3/4 bg-purple-600 rounded-md shadow-xl flex items-center justify-center text-white text-2xl font-bold">Sem Imagem</div>';
                  }}
                />
              ) : (
                <div className="w-3/4 h-3/4 bg-purple-600 rounded-md shadow-xl flex items-center justify-center text-white text-2xl font-bold">
                  Sem Imagem
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: INFO*/}
          <div className="w-full lg:max-w-lg space-y-6 font-sans">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-medium text-black mb-2">{product.nome}</h1>
                {isOwner && (
                  <button
                    onClick={() => setShowEditarProduto(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                )}
              </div>

              {/* Rating Row */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-black font-bold ml-1">
                    {averageRating !== null ? averageRating.toFixed(2) : '-'}
                  </span>
                </div>
                <span>| {reviews.length || '-'} reviews</span>
                <span className="text-purple-500">{storeName}</span>
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

        {/* --- LAST REVIEW --- */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-black">Última avaliação</h3>
            <Link
              href={`/avaliacoes-produto?id=${product.id}`}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              ver mais avaliações
            </Link>
          </div>

          {latestReview ? (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                <Image
                  src={latestReview.usuario?.foto_perfil_url || profilePicture}
                  alt={latestReview.usuario?.nome || 'Usuário'}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-black">{latestReview.usuario?.nome || 'Usuário'}</span>
                  <span className="text-sm text-gray-500">{formatTimeAgo(latestReview.createdAt)}</span>
                </div>
                <div className="flex gap-1 mb-2 text-[#FFEB3A]">
                  {Array.from({ length: latestReview.nota }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed line-clamp-3">
                  {latestReview.comentario || 'Sem comentário'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma avaliação disponível.</p>
          )}
        </div>

        {/* --- 3. RELATED PRODUCTS (Da mesma loja) --- */}
        <div className="mt-12">
          <h2 className="text-4xl font-medium mb-6 text-black font-[League_Spartan] ">Da mesma loja</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => {
                const imageUrl = item.imagens && item.imagens.length > 0 && item.imagens[0].url ? item.imagens[0].url : null;
                return (
                  <Link
                    key={item.id}
                    href={`/produto/${item.id}`}
                    className="block"
                  >
                    <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md h-full cursor-pointer">
                      <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.nome}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/300x300/EFEFEF/333?text=Produto';
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
                        <h4 className="font-semibold text-sm text-gray-800 truncate">{item.nome}</h4>
                        <p className="font-bold text-gray-900 mt-1">R${(item.preco / 100).toFixed(2).replace('.', ',')}</p>
                        {item.estoque > 0 ? (
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
              })}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum outro produto desta loja.</p>
          )}
        </div>

      </main>
      <Footer />

      {/* Edit Product Modal */}
      {isOwner && (
        <Modal isOpen={showEditarProduto} onClose={() => setShowEditarProduto(false)}>
          <EditarProduto 
            productId={product.id} 
            onClose={() => setShowEditarProduto(false)}
            onSuccess={handleRefreshProduct}
          />
        </Modal>
      )}
    </div>
  );
}
