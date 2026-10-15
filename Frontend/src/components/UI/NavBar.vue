<template>
<nav class="library-navbar">
  <div class="navbar-inner">
    <div class="nav-left">
      <div class="logo-section">
        <span class="logo-icon">📚</span>
        <div class="logo-text">
          <h1>Городская библиотека</h1>
          <p class="logo-subtitle">им. А.С. Пушкина</p>
        </div>
      </div>
    </div>

    <div class="nav-center">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/books" class="nav-link">Каталог</router-link>
      <router-link to="/reservations" class="nav-link">Бронирования</router-link>
      <router-link to="/contacts" class="nav-link">Контакты</router-link>
    </div>

    <div class="nav-right">
      <button v-if="!isLoggedIn" class="btn-login" @click="dialog = true">
        <span class="btn-icon">🔐</span> Войти
      </button>
      <div v-else class="user-section">
        <span class="user-avatar">👤</span>
        <span class="user-name">{{ userDisplayName }}</span>
        <button class="btn-logout" @click="logout" title="Выйти">
          <span class="btn-icon">🚪</span>
        </button>
      </div>
    </div>
  </div>
  <LoginDialog v-model="dialog" @logged-in="onLoggedIn" />
</nav>
</template>

<script>
import LoginDialog from './LoginDialog.vue';
import userService from '../../plugins/api/services/UserService.js';

export default {
name: 'NavBar',
components: { LoginDialog },
data() {
  return {
    dialog: false,
    isLoggedIn: false,
    userEmail: '',
    userDisplayName: '',
  };
},
mounted() { this.checkAuthStatus(); },
methods: {
  checkAuthStatus() {
    const recordId = sessionStorage.getItem('recordId');
    const userEmail = sessionStorage.getItem('userEmail');
    const userFullName = sessionStorage.getItem('userFullName');
    if (recordId && userEmail) {
      this.isLoggedIn = true;
      this.userEmail = userEmail;
      this.userDisplayName = userFullName || userEmail;
      if (!userFullName) this.loadCurrentUser();
    } else {
      this.isLoggedIn = false;
      this.userDisplayName = '';
    }
  },
  async loadCurrentUser() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;
    try {
      const user = await userService.getUserById(userId);
      if (user && user.fields) {
        const fullName = `${user.fields.Surname || ''} ${user.fields.Name || ''}`.trim();
        this.userDisplayName = fullName || this.userEmail;
        sessionStorage.setItem('userFullName', this.userDisplayName);
      }
    } catch (e) { console.error(e); }
  },
  onLoggedIn() { this.checkAuthStatus(); },
  logout() {
    ['recordId', 'userId', 'userEmail', 'userFullName'].forEach(k => sessionStorage.removeItem(k));
    this.isLoggedIn = false;
    this.userDisplayName = '';
  },
},
};
</script>

<style scoped>
.library-navbar {
position: fixed;
top: 0;
left: 0;
right: 0;
background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
color: #FFFAF0;
height: 80px;
z-index: 1000;
box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
border-bottom: 3px solid #D2691E;
}

.navbar-inner {
display: flex;
justify-content: space-between;
align-items: center;
height: 100%;
padding: 0 30px;
max-width: 1600px;
margin: 0 auto;
}

.nav-left {
flex: 1;
}

.logo-section {
display: flex;
align-items: center;
gap: 12px;
}

.logo-icon {
font-size: 42px;
}

.logo-text h1 {
font-family: 'Playfair Display', serif;
font-size: 22px;
font-weight: 700;
margin: 0;
color: #FFFAF0;
letter-spacing: 0.5px;
}

.logo-subtitle {
font-size: 12px;
color: #F5DEB3;
margin: 0;
font-style: italic;
}

.nav-center {
flex: 2;
display: flex;
justify-content: center;
gap: 8px;
}

.nav-link {
color: #FFFAF0;
text-decoration: none;
padding: 10px 20px;
border-radius: 6px;
transition: all 0.3s ease;
font-size: 15px;
font-weight: 500;
border: 2px solid transparent;
}

.nav-link:hover {
background-color: rgba(255, 250, 240, 0.15);
border-color: #D2691E;
transform: translateY(-2px);
}

.nav-link.router-link-active {
background-color: rgba(255, 250, 240, 0.2);
border-color: #F5DEB3;
}

.nav-right {
flex: 1;
display: flex;
justify-content: flex-end;
}

.btn-login {
background: #FFFAF0;
color: #8B0000;
border: 2px solid #D2691E;
padding: 10px 20px;
border-radius: 8px;
cursor: pointer;
font-weight: 600;
font-size: 14px;
transition: all 0.3s ease;
display: flex;
align-items: center;
gap: 6px;
}

.btn-login:hover {
background: #F5DEB3;
transform: translateY(-2px);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-section {
display: flex;
align-items: center;
gap: 10px;
background: rgba(255, 250, 240, 0.15);
padding: 8px 16px;
border-radius: 8px;
border: 1px solid #D2691E;
}

.user-avatar {
font-size: 24px;
}

.user-name {
font-size: 14px;
font-weight: 500;
color: #FFFAF0;
}

.btn-logout {
background: none;
border: none;
color: #FFFAF0;
cursor: pointer;
font-size: 18px;
padding: 4px 8px;
border-radius: 4px;
transition: background 0.3s;
}

.btn-logout:hover {
background: rgba(255, 250, 240, 0.2);
}

.btn-icon {
font-size: 16px;
}
</style>