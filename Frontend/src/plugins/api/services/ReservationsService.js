import { API_BASE_URL, fetchData } from '../apiConfig.js';
class ReservationsService {
  async getAllReservations() { return fetchData(`${API_BASE_URL}/reservations/`); }
  async createReservation(data) {
    return fetchData(`${API_BASE_URL}/reservations/`, { method: 'POST', body: JSON.stringify(data) });
  }
  async updateReservation(id, data) {
    return fetchData(`${API_BASE_URL}/reservations/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }
  async deleteReservation(id) {
    return fetchData(`${API_BASE_URL}/reservations/${id}`, { method: 'DELETE' });
  }
}
export default new ReservationsService();