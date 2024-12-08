import { School, OrderData } from '../types';

const API_BASE_URL = 'https://api.ukhsc.org';

export const apiService = {
  async getPartnerSchools(): Promise<School[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/partner-school`);
      if (!response.ok) throw new Error('Failed to fetch schools');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createPersonalOrder(orderData: OrderData): Promise<string> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/forms/personal-membership-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create order');
      }

      return await response.text();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  },

  async linkGoogleAccount(code: string, redirectUri: string): Promise<unknown> {
    try {
      const token = localStorage.getItem('ordererToken');
      if (!token) throw new Error('No orderer token found');

      const response = await fetch(
        `${API_BASE_URL}/auth/federated/Google/link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            flow: 'authorization_code',
            grant_value: code,
            redirect_uri: redirectUri,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to link Google account');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  },
};

export default apiService;
