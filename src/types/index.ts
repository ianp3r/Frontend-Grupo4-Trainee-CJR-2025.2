export interface User {
  id: number;
  username: string;
  nome: string;
  email: string;
  foto_perfil_url: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: number;
  usuarioId: number;
  nome: string;
  descricao: string | null;
  logo_url: string | null;
  banner_url: string | null;
  sticker_url: string | null;
  createdAt: string;
  updatedAt: string;
  produtos: Product[];
}

export interface Product {
  id: number;
  lojaId: number;
  categoriaId: number;
  nome: string;
  descricao: string | null;
  preco: number; // em centavos
  estoque: number;
  createdAt: string;
  updatedAt: string;
  categoria: Category;
  imagens: ProductImage[];
}

export interface Category {
  id: number;
  nome: string;
  categoriaPaiId: number | null;
}

export interface ProductImage {
  id: number;
  produtoId: number;
  url_imagem: string;
  ordem: number | null;
}

export interface UserWithStores extends User {
  lojas: Store[];
}