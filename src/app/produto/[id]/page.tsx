import { Star } from 'lucide-react';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import profilePicture from '@/assets/userimage.avif';
import type { ProductReview } from '@/types';

interface ProductImage {
  id: number;
  productId: number;
  url: string;
  alt_text?: string;
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
  images?: ProductImage[];
}

interface StoreProductImage {
  url_imagem: string;
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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/produto/${id}`, {
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getProductReviews(id: string): Promise<ProductReview[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/product-reviews?produtoId=${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return [];
  }
}

async function getStore(lojaId: number): Promise<StoreSummary | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/loja/${lojaId}`, { cache: 'no-store' });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching store:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const [reviews, store] = await Promise.all([
    getProductReviews(id),
    getStore(product.lojaId),
  ]);

  const images = product.images || [];
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
                const imageUrl = item.imagens && item.imagens.length > 0 ? item.imagens[0].url_imagem : null;
                return (
                  <Link
                    key={item.id}
                    href={`/produto/${item.id}`}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition block"
                  >
                    <div className="h-40 bg-gray-100 rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.nome}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-sm">Sem imagem</span>
                      )}
                    </div>
                    <p className="font-bold text-lg text-black font-[League_Spartan] truncate">{item.nome}</p>
                    <p className="text-sm text-gray-700 font-[League_Spartan]">R${(item.preco / 100).toFixed(2).replace('.', ',')}</p>
                    <p className="text-xs text-gray-500 font-[League_Spartan]">{item.estoque} disponíveis</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum outro produto desta loja.</p>
          )}
        </div>

      </main>
    </div>
  );
}
