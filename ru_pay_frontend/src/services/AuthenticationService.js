import apiService from './ApiService';

const AuthenticationService = {
  async registerUser(userData) {
    try {
      const response = await apiService.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  async loginUser(credentialsData) {
    try {
      const response = await apiService.post('/api/auth/login', credentialsData);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },
};

export default AuthenticationService;