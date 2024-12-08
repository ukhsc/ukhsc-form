import { School, OrderData, Order } from '../types';

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

  async getOrderInfo(): Promise<Order> {
    try {
      const token = localStorage.getItem('ordererToken');
      if (!token) throw new Error('No orderer token found');

      const response = await fetch(
        `${API_BASE_URL}/forms/personal-membership-order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch order info');
      }

      return await response.json();
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

        if (error.error.startsWith('Account already linked')) {
          throw new Error(
            '您已經綁定過帳號，或者這個 Google 帳號已經綁定過其他高校特約會員帳號了，請換一個 Google 帳號綁定看看！'
          );
        }

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
