const API_BASE_URL = 'https://api.ukhsc.org';

export const apiService = {
  // 取得合作學校列表
  async getPartnerSchools() {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/partner-school`);
      if (!response.ok) throw new Error('Failed to fetch schools');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // 建立個人會員訂單
  async createPersonalOrder(orderData) {
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

      return await response.text(); // 回傳 Token
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // 綁定 Google 帳號
  async linkGoogleAccount(code, redirectUri) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/federated/Google/link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('orderToken')}`,
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
      console.error('Error:', error);
      throw error;
    }
  },
};

export default apiService;
