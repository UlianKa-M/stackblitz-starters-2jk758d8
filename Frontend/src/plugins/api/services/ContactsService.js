import { API_BASE_URL, fetchData } from '../apiConfig.js';
class ContactsService {
  async getContacts() { return fetchData(`${API_BASE_URL}/contacts/`); }
}
export default new ContactsService();