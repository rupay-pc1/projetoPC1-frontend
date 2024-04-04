import apiService from './ApiService';

const AdminService = {
  async listUsers() {
    try {
      const response = await apiService.get('api/user/list');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const response = await apiService.get(`api/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      throw error;
    }
  },
};

export default AdminService;