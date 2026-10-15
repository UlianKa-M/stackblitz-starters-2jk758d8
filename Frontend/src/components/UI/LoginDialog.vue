<template>
<v-dialog v-model="dialog" max-width="480">
  <v-card class="login-card">
    <div class="login-header">
      <span class="header-icon">📚</span>
      <h2>Вход в библиотеку</h2>
    </div>

    <v-tabs v-model="tab" color="#8B0000" class="login-tabs">
      <v-tab value="login">Войти</v-tab>
      <v-tab value="register">Регистрация</v-tab>
    </v-tabs>

    <v-card-text class="login-body">
      <v-text-field
        v-model="email"
        label="Email"
        variant="outlined"
        class="mt-4"
        prepend-inner-icon="mdi-email"
      />
      <v-text-field
        v-model="password"
        label="Пароль"
        type="password"
        variant="outlined"
        prepend-inner-icon="mdi-lock"
      />

      <div v-if="tab === 'register'">
        <v-text-field
          v-model="name"
          label="Имя"
          variant="outlined"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="surname"
          label="Фамилия"
          variant="outlined"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="phone"
          label="Телефон"
          variant="outlined"
          prepend-inner-icon="mdi-phone"
        />
      </div>
    </v-card-text>

    <v-card-actions class="login-actions">
      <v-btn variant="text" @click="close" class="btn-cancel">Отмена</v-btn>
      <v-spacer />
      <v-btn @click="submit" class="btn-submit">
        {{ tab === 'login' ? '🔐 Войти' : ' Зарегистрироваться' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import loginService from '../../plugins/api/services/LoginService.js';
import userService from '../../plugins/api/services/UserService.js';

export default {
name: 'LoginDialog',
props: { modelValue: Boolean },
emits: ['update:modelValue', 'logged-in'],
data() {
  return {
    tab: 'login',
    email: '', password: '', name: '', surname: '', phone: '',
  };
},
computed: {
  dialog: {
    get() { return this.modelValue; },
    set(val) { this.$emit('update:modelValue', val); },
  },
},
methods: {
  close() { this.dialog = false; },
  async submit() {
    if (!this.email || !this.password) { alert('Email и пароль обязательны!'); return; }
    try {
      if (this.tab === 'login') {
        const result = await loginService.authorizationUser(this.email, this.password);
        if (result.recordId) {
          sessionStorage.setItem('recordId', result.recordId);
          sessionStorage.setItem('userId', result.userId);
          sessionStorage.setItem('userEmail', this.email);
          const currentUser = await userService.getUserById(result.userId);
          if (currentUser && currentUser.fields) {
            const fullName = `${currentUser.fields.Surname || ''} ${currentUser.fields.Name || ''}`.trim();
            sessionStorage.setItem('userFullName', fullName);
          }
        }
      } else {
        if (!this.name || !this.surname) { alert('Заполните имя и фамилию!'); return; }
        await loginService.registerUser({
          email: this.email, password: this.password,
          name: this.name, surname: this.surname, phone: this.phone,
        });
        alert('Регистрация успешна! Теперь войдите.');
        this.tab = 'login';
        return;
      }
      this.$emit('logged-in');
      this.close();
    } catch (error) { alert(error.message || 'Ошибка'); }
  },
},
};
</script>

<style scoped>
.login-card {
border-radius: 12px;
overflow: hidden;
border: 2px solid #8B0000;
}

.login-header {
background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
padding: 24px;
text-align: center;
color: #FFFAF0;
}

.header-icon {
font-size: 48px;
display: block;
margin-bottom: 8px;
}

.login-header h2 {
font-family: 'Playfair Display', serif;
font-size: 24px;
margin: 0;
color: #FFFAF0;
}

.login-tabs {
border-bottom: 2px solid #D2691E;
}

.login-body {
padding: 24px;
background: #FFFAF0;
}

.login-actions {
padding: 16px 24px;
background: #F5DEB3;
border-top: 2px solid #D2691E;
}

.btn-cancel {
color: #8B0000;
font-weight: 600;
}

.btn-submit {
background: #8B0000;
color: #FFFAF0;
font-weight: 600;
padding: 8px 24px;
}

.btn-submit:hover {
background: #A52A2A;
}
</style>