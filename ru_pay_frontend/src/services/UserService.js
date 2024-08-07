import apiService from "./ApiService";

const UserService = {
  async getUserInfo(email) {
    try {
      const response = await apiService.get(`api/user/email/${email}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      throw error;
    }
  },

  async getTickets(userId, query = "") {
    try {
      const response = await apiService.get(
        `api/ticket/listTicketsByUserId/${userId}?${query}`,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tickets do usuário:", error);
      throw error;
    }
  },

  async getAvailableTickets(userId) {
    try {
      const response = await apiService.get(
        `api/ticket/checkUserOptions/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar tickets disponíveis para o usuário:",
        error,
      );
      throw error;
    }
  },
};

export default UserService;
