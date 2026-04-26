import { apiUsers } from '../apiUsers';

export const mailApi = {

    // envoyer un mail a l'administrateur
    contact: async (formData: any) => {
        return apiUsers.request('/mail/contact', {
            method: 'POST',
            body: formData,
        });
    },

}