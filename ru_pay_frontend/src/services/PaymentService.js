import apiService from "./ApiService";

const PaymentService = {
  async makePayment({ userId, ticketType }) {
    try {
      const response = await apiService.post(
        `payment/checkout/${userId}/${ticketType}`,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar pagamento:", error);
      throw error;
    }
  },
};

export default PaymentService;
