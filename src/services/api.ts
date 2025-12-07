import { User, UserWithStores, ProductReview, Comment, StoreReview } from '@/types';

const API_BASE_URL = 'http://localhost:4000'; // Backend NestJS server port

export class UserAPI {
  static async getUserById(id: number): Promise<User> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateUser(id: number, data: { nome?: string; username?: string; email?: string; foto_perfil_url?: string }): Promise<User> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error updating user: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteUser(id: number): Promise<void> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting user: ${response.statusText}`);
    }
  }

  static async getUserWithStores(id: number): Promise<UserWithStores> {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}/loja/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('API error response:', errorText);
      throw new Error(`Error fetching user stores: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }
}

export class StoreAPI {
  static async getStoresByUserId(userId: number) {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/loja/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user stores: ${response.statusText}`);
    }

    return response.json();
  }

  static async createStore(data: { nome: string; descricao?: string; logo_url?: string; banner_url?: string; sticker_url?: string; usuarioId: number }) {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/loja`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating store: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }
}

export class ProductReviewAPI {
  static async getReviewById(id: number): Promise<ProductReview> {
    const response = await fetch(`${API_BASE_URL}/product-reviews/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching review: ${response.statusText}`);
    }

    return response.json();
  }

  static async getReviewsByProductId(produtoId: number): Promise<ProductReview[]> {
    const response = await fetch(`${API_BASE_URL}/product-reviews?produtoId=${produtoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching reviews: ${response.statusText}`);
    }

    return response.json();
  }

  static async createReview(data: { usuarioId: number; produtoId: number; nota: number; comentario?: string }): Promise<ProductReview> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/product-reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating review: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }
}

export class CommentAPI {
  static async getCommentsByReviewId(avaliacaoProdutoId: number): Promise<Comment[]> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/comments?avaliacaoProdutoId=${avaliacaoProdutoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.statusText}`);
    }

    return response.json();
  }

  static async getCommentsByStoreReviewId(avaliacaoId: number): Promise<Comment[]> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/comments?avaliacaoId=${avaliacaoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.statusText}`);
    }

    return response.json();
  }

  static async createComment(data: { usuarioId: number; avaliacaoProdutoId?: number; avaliacaoId?: number; conteudo: string }): Promise<Comment> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating comment: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }
}

export class StoreReviewAPI {
  static async getReviewById(id: number): Promise<StoreReview> {
    const response = await fetch(`${API_BASE_URL}/store-reviews/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching store review: ${response.statusText}`);
    }

    return response.json();
  }

  static async getReviewsByStoreId(lojaId: number): Promise<StoreReview[]> {
    const response = await fetch(`${API_BASE_URL}/store-reviews?lojaId=${lojaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching store reviews: ${response.statusText}`);
    }

    return response.json();
  }

  static async createReview(data: { usuarioId: number; lojaId: number; nota: number; comentario?: string }): Promise<StoreReview> {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/store-reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating store review: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }
}