import { apiUsers } from '../apiUsers';

export const paymentApi = {
  /**
   * Initier un paiement Wave
   * @param paymentData - Données du paiement (cartItems, customerInfo, totalAmount)
   * @returns URL de redirection Wave et sessionId
   */
  initiateWave: async (paymentData: {
    cartItems: any[];
    customerInfo: any;
    totalAmount: number;
  }) => {
    return apiUsers.request('/payment/wave/initiate', {
      method: 'POST',
      body: paymentData,
    });
  },

  /**
   * Vérifier le statut d'un paiement Wave
   * @param sessionId - ID de la session Wave
   * @returns Statut du paiement et informations des commandes
   */
  checkWaveStatus: async (sessionId: string) => {
    return apiUsers.request(`/payment/wave/status/${sessionId}`);
  },

  /**
   * Obtenir les statistiques de paiement (admin)
   * @returns Statistiques globales des paiements
   */
  getStats: async () => {
    return apiUsers.request('/payment/stats');
  },
};
