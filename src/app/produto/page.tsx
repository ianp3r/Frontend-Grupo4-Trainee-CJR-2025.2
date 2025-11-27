import { ChevronLeft, Star } from 'lucide-react';
import Header from '@/components/Header';


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
  image: "@/assets/brownie"
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-cream">

      <Header />

      <main className="container mx-auto px-4 py-8">


        {/* --- MAIN CONTENT ---        */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-6 rounded-3xl">

          {/* LEFT COLUMN: IMAGES*/}
          <div className="flex flex-col-reverse lg:flex-row gap-4 items-start shrink-0">

            {/* Thumbnails Strip */}
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full lg:w-auto justify-center lg:justify-start">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-20 h-20 lg:w-24 lg:h-24 border rounded-[20px] overflow-hidden cursor-pointer hover:border-purple-500 shrink-0"
                >
                  <div className="w-full h-full bg-white" />
                </div>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative bg-gray-50 rounded-[30px] flex items-center justify-center w-full aspect-square lg:w-[432px] lg:h-[432px] lg:flex-none">
              <div className="absolute top-4 right-4 bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                CJR
              </div>
              <div className="w-3/4 h-3/4 bg-purple-600 rounded-md shadow-xl flex items-center justify-center text-white text-2xl font-bold">
                Product Image
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INFO*/}
          <div className="w-full lg:max-w-lg space-y-6 font-sans">
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

            <div className="text-4xl font-medium mt-2! text-gray-900">
              R${product.price.toFixed(2).replace('.', ',')}
            </div>

            <div className="text-sm text-gray-700 leading-relaxed">
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
          <h2 className="text-4xl font-medium mb-6 text-black font-[League_Spartan] ">Da mesma loja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Simple Card Component */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                <div className="h-40 bg-gray-100 rounded-xl mb-4 relative">
                </div>
                <p className="font-bold text-lg text-black font-[League_Spartan]">Brownie Trad...</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
