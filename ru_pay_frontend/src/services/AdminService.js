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


  async listTickets(){
    try{
      const response = await apiService.get(`/api/ticket`);
      return response.data;
    } catch(error){
      console.error('Erro ao listar tickets:', error);
      throw error;
    }
  },

  async consultTicketById(ticketId) {
    try {
      console.log("id aqui", ticketId)
      const response = await apiService.get(
        `/api/ticket/consultTicketById/${ticketId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar busca por ticket:", error);
      throw error;
    }
  },

  async updateTicketStatusToInactive(ticketId) {
    try {
      const response = await apiService.put(
        `/api/ticket/updateTicketStatusToInactive/${ticketId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar ticket:", error);
      throw error;
    }
  }
  
};



export default AdminService;