import { User, UserWithStores } from '@/types';

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

  static async getUserWithStores(id: number): Promise<UserWithStores> {
    const token = localStorage.getItem('authToken');
    console.log('Making API call with token:', !!token);
    
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
}