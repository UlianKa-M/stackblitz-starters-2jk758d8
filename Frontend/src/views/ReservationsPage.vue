<template>
<div class="reservations-page">
  <div class="page-header">
    <h1>📋 Мои бронирования</h1>
    <p class="page-subtitle">Управляйте вашими забронированными книгами</p>
  </div>

  <div v-if="reservations.length > 0" class="reservations-list">
    <div class="reservation-card" v-for="r in reservations" :key="r.id">
      <div class="reservation-icon"></div>
      <div class="reservation-info">
        <h3 class="book-title">{{ r.fields.BookTitle }}</h3>
        <div class="reservation-meta">
          <span class="meta-item">📅 Возврат: {{ r.fields.ReturnDate }}</span>
          <span class="meta-item"> №{{ r.fields.ReservationId }}</span>
        </div>
      </div>
      <div class="reservation-status" :class="getStatusClass(r.fields.Status)">
        {{ r.fields.Status }}
      </div>
      <div class="reservation-actions">
        <button class="btn-action btn-extend" @click="updateStatus(r, 'Продлено')">
          ⏰ Продлить
        </button>
        <button class="btn-action btn-return" @click="updateStatus(r, 'Возвращена')">
          ✓ Вернуть
        </button>
        <button class="btn-action btn-cancel" @click="deleteReservation(r.id)">
          ✕ Отменить
        </button>
      </div>
    </div>
  </div>

  <div v-else class="no-reservations">
    <span class="no-reservations-icon">📭</span>
    <h2>У вас пока нет бронирований</h2>
    <p>Перейдите в каталог и выберите интересующую книгу</p>
    <router-link to="/books" class="btn-go-catalog">📚 Перейти к каталогу</router-link>
  </div>
</div>
</template>

<script>
import reservationsService from '../plugins/api/services/ReservationsService.js';

export default {
name: 'ReservationsPage',
data() { return { reservations: [] }; },
async mounted() { await this.loadReservations(); },
methods: {
  async loadReservations() {
    try {
      const userId = sessionStorage.getItem('userId');
      const data = await reservationsService.getAllReservations();
      this.reservations = (data.records || []).filter(r => r.fields.UserId === parseInt(userId));
    } catch (e) { console.error(e); }
  },
  getStatusClass(status) {
    const map = {
      'Активно': 'status-active',
      'Продлено': 'status-extended',
      'Возвращена': 'status-returned',
      'Отменена': 'status-cancelled',
    };
    return map[status] || '';
  },
  async updateStatus(reservation, status) {
    await reservationsService.updateReservation(reservation.id, { Status: status });
    await this.loadReservations();
  },
  async deleteReservation(id) {
    if (!confirm('Отменить бронирование?')) return;
    await reservationsService.deleteReservation(id);
    await this.loadReservations();
  },
},
};
</script>

<style scoped>
.reservations-page {
background: #FDF5E6;
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
color: #8B0000;
margin: 0 0 12px 0;
}

.page-subtitle {
font-size: 18px;
color: #666;
margin: 0;
font-style: italic;
}

.reservations-list {
max-width: 1000px;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 20px;
}

.reservation-card {
background: #FFFAF0;
border: 2px solid #D2691E;
border-radius: 12px;
padding: 24px;
display: flex;
align-items: center;
gap: 20px;
transition: all 0.3s ease;
}

.reservation-card:hover {
transform: translateX(5px);
box-shadow: 0 8px 16px rgba(139, 0, 0, 0.15);
}

.reservation-icon {
font-size: 48px;
flex-shrink: 0;
}

.reservation-info {
flex: 1;
}

.book-title {
font-family: 'Playfair Display', serif;
font-size: 20px;
color: #2C1810;
margin: 0 0 8px 0;
}

.reservation-meta {
display: flex;
gap: 20px;
flex-wrap: wrap;
}

.meta-item {
font-size: 14px;
color: #666;
}

.reservation-status {
padding: 8px 16px;
border-radius: 20px;
font-size: 13px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.status-active {
background: #87CEEB;
color: #0066CC;
}

.status-extended {
background: #FFD700;
color: #8B4513;
}

.status-returned {
background: #90EE90;
color: #006400;
}

.status-cancelled {
background: #FFB6C1;
color: #8B0000;
}

.reservation-actions {
display: flex;
gap: 8px;
flex-wrap: wrap;
}

.btn-action {
padding: 8px 16px;
border: none;
border-radius: 6px;
cursor: pointer;
font-size: 13px;
font-weight: 600;
transition: all 0.3s ease;
}

.btn-extend {
background: #FFD700;
color: #8B4513;
}

.btn-extend:hover {
background: #FFC107;
transform: translateY(-2px);
}

.btn-return {
background: #90EE90;
color: #006400;
}

.btn-return:hover {
background: #7CFC00;
transform: translateY(-2px);
}

.btn-cancel {
background: #FFB6C1;
color: #8B0000;
}

.btn-cancel:hover {
background: #FF69B4;
transform: translateY(-2px);
}

.no-reservations {
text-align: center;
padding: 80px 20px;
background: #FFFAF0;
border-radius: 12px;
border: 2px dashed #D2691E;
max-width: 600px;
margin: 0 auto;
}

.no-reservations-icon {
font-size: 100px;
display: block;
margin-bottom: 20px;
opacity: 0.5;
}

.no-reservations h2 {
font-family: 'Playfair Display', serif;
font-size: 28px;
color: #8B0000;
margin: 0 0 12px 0;
}

.no-reservations p {
font-size: 16px;
color: #666;
margin: 0 0 24px 0;
}

.btn-go-catalog {
display: inline-block;
background: #8B0000;
color: #FFFAF0;
padding: 14px 28px;
border-radius: 8px;
text-decoration: none;
font-weight: 600;
transition: all 0.3s ease;
}

.btn-go-catalog:hover {
background: #A52A2A;
transform: translateY(-2px);
box-shadow: 0 6px 12px rgba(139, 0, 0, 0.3);
}
</style>