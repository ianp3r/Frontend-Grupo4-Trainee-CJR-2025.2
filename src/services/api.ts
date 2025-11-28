import { User, UserWithStores } from '@/types';

const API_BASE_URL = 'http://localhost:4000'; // Backend NestJS server port

export class UserAPI {
  static async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }

    return response.json();
  }

  static async getUserWithStores(id: number): Promise<UserWithStores> {
    const response = await fetch(`${API_BASE_URL}/users/${id}/with-stores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user with stores: ${response.statusText}`);
    }

    return response.json();
  }
}

export class StoreAPI {
  static async getStoresByUserId(userId: number) {
    const response = await fetch(`${API_BASE_URL}/loja/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user stores: ${response.statusText}`);
    }

    return response.json();
  }
}