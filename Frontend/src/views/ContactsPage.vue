<template>
  <div class="contacts-page">
    <div class="page-header">
      <h1>📞 Контакты</h1>
      <p class="page-subtitle">Свяжитесь с нами удобным способом</p>
    </div>

    <div class="contacts-content">
      <div class="contacts-info" v-if="contacts">
        <div class="info-card">
          <div class="info-icon"></div>
          <div class="info-content">
            <h3>Адрес</h3>
            <p>{{ contacts.fields.Address }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">📱</div>
          <div class="info-content">
            <h3>Телефон</h3>
            <p>{{ contacts.fields.Phone }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">✉️</div>
          <div class="info-content">
            <h3>Email</h3>
            <p>{{ contacts.fields.Email }}</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon">🕐</div>
          <div class="info-content">
            <h3>Режим работы</h3>
            <p>{{ contacts.fields.WorkHours }}</p>
          </div>
        </div>
      </div>

      <div class="map-placeholder">
        <span class="map-icon">🗺️</span>
        <p>Карта проезда</p>
      </div>
    </div>
  </div>
</template>

<script>
import contactsService from '../plugins/api/services/ContactsService.js';

export default {
  name: 'ContactsPage',
  data() {
    return { contacts: null };
  },
  async mounted() {
    try {
      const data = await contactsService.getContacts();
      if (data.records && data.records.length > 0)
        this.contacts = data.records[0];
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.contacts-page {
  background: #fdf5e6;
  min-height: 100vh;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 42px;
  color: #8b0000;
  margin: 0 0 12px 0;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
  font-style: italic;
}

.contacts-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: #fffaf0;
  border: 2px solid #d2691e;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 16px rgba(139, 0, 0, 0.15);
}

.info-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: #8b0000;
  margin: 0 0 8px 0;
}

.info-content p {
  font-size: 16px;
  color: #2c1810;
  margin: 0;
  line-height: 1.5;
}

.map-placeholder {
  background: linear-gradient(135deg, #f5deb3 0%, #d2691e 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border: 2px solid #8b0000;
}

.map-icon {
  font-size: 120px;
  opacity: 0.3;
  margin-bottom: 16px;
}

.map-placeholder p {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: #fffaf0;
  margin: 0;
}

@media (max-width: 768px) {
  .contacts-content {
    grid-template-columns: 1fr;
  }
}
</style>
