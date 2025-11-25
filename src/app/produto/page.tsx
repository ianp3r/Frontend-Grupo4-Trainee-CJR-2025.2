import React from 'react';
import { ShoppingBag, Store, ChevronLeft, Star } from 'lucide-react'; // You might need to install: npm install lucide-react

const product = {
  id: 1,
  name: "Brownie Meio Amargo",
  price: 4.70,
  description: "Recheado com uma ganache de chocolate meio amargo bem cremosa, esse brownie conquistou o coração de muita gente!",
  ingredients: "Achocolatado em pó, farinha de trigo enriquecida com ferro e ácido fólico, chocolate meio amargo, açúcar cristal...",
  rating: 4.5,
  reviews: 15,
  stock: 3,
  store: "mercado",
  image: "/path-to-your-purple-brownie.png", // Replace with actual image path
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#F6F3E4] "> {/* Cream background color from image */}


      <main className="container mx-auto px-4 py-8">

        {/* Back Button */}
        <button className="mb-6 hover:bg-gray-200 p-2 rounded-full transition">
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* --- 2. MAIN PRODUCT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-3xl shadow-sm">

          {/* LEFT COLUMN: IMAGES (Occupies 7/12 of width on large screens) */}
          <div className="lg:col-span-7 flex gap-4">
            {/* Thumbnails Strip */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-20 h-20 border rounded-lg overflow-hidden cursor-pointer hover:border-purple-500">
                  {/* Placeholder for thumbnail */}
                  <div className="w-full h-full bg-purple-100" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative bg-gray-50 rounded-xl flex items-center justify-center">
              {/* The 'CJR' badge */}
              <div className="absolute top-4 right-4 bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                CJR
              </div>
              {/* Replace div below with <Image /> from next/image */}
              <div className="w-64 h-80 bg-purple-600 rounded-md shadow-xl flex items-center justify-center text-white">
                Product Image Here
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INFO (Occupies 5/12 of width) */}
          <div className="lg:col-span-5 space-y-6 font-sans">

            <div>
              <h1 className="text-3xl font-medium text-black mb-2">{product.name}</h1>

              {/* Rating Row */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-black font-bold ml-1">{product.rating}</span>
                </div>
                <span>| {product.reviews} reviews</span>
                <span className="text-purple-500">{product.store}</span>
                <span className="text-purple-500">{product.stock} disponíveis</span>
              </div>
            </div>

            <div className="text-4xl font-medium text-gray-900">
              R${product.price.toFixed(2).replace('.', ',')}
            </div>

            {/* Description Box */}
            <div className="bg-[#FDFBF4] p-4 rounded-lg text-sm text-gray-700 leading-relaxed">
              <h3 className="font-bold uppercase text-gray-500 text-xs mb-2">Descrição</h3>
              <p className="font-bold mb-2">BROWNIE MEIO AMARGO 80g</p>
              <p className="mb-4">{product.description}</p>

              <p className="font-bold text-xs mt-2">Ingredientes</p>
              <p className="text-xs text-gray-500">{product.ingredients}</p>

              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>CONTÉM GLÚTEN.</p>
                <p>CONTÉM LACTOSE.</p>
                <p>ALÉRGICOS: CONTÉM OVO E DERIVADOS DE LEITE, TRIGO E SOJA.</p>
              </div>
            </div>

          </div>
        </div>

        {/* --- 3. RELATED PRODUCTS (Da mesma loja) --- */}
        <div className="mt-12">
          <h2 className="text-2xl font-medium mb-6">Da mesma loja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Simple Card Component */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                <div className="h-40 bg-gray-100 rounded-xl mb-4 relative">
                  <div className="absolute top-2 right-2 bg-blue-900 text-white text-[10px] p-1 rounded-full">CJR</div>
                </div>
                <p className="font-bold">Brownie Trad...</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
