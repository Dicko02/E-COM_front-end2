import { apiUsers } from '../apiUsers';

export const paymentApi = {

  // Initier un paiement SenePay (Wave + Orange Money + Free Money + etc.)
  initiate: async (paymentData: {
    cartItems:    any[];
    customerInfo: any;
    totalAmount:  number;
  }) => {
    return apiUsers.request('/payment/senepay/initiate', {
      method: 'POST',
      body:   paymentData,
    });
  },

  // Vérifier le statut d'une session SenePay
  checkStatus: async (sessionToken: string) => {
    return apiUsers.request(`/payment/senepay/status/${sessionToken}`);
  },

  // Statistiques admin
  getStats: async () => {
    return apiUsers.request('/payment/stats');
  },
};