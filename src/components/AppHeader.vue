<template>
  <header class="app-header">
    <div class="header-content">
      
      <router-link to="/" class="header-logo-link">
        <img src="/public/fotodoatomo.jpg" alt="Ícone Tabela Periódica" class="header-icon">
        <h1 class="header-title">Tabela Periódica Interativa</h1>
      </router-link>
      
      <div class="spacer"></div>
      
      <button 
        @click="toggleDarkMode" 
        class="btn theme-toggle-button" 
        :title="isDarkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'"
      >
        <span v-if="isDarkMode">☀️</span>
        <span v-else>🌙</span>
      </button>
        <!-- 
          Bloco de ações para usuários autenticados. Só aparece se 'isAuthenticated' (da store) for verdadeiro.
        -->
      <div v-if="isAuthenticated" class="logged-in-actions">
        <router-link 
          to="/perfil" 
          class="btn profile-button"
          title="Meu Perfil"
        >
          👤
        </router-link>
        <button @click="handleLogout" class="btn logout-button">
          Sair
        </button>
      </div>
        <!-- 
          Bloco de ações para usuários deslogados (na Home). Só aparece se o usuário não estiver autenticado e (&&) estiver na página 'Home' (verificado pelo 'isHomePage').
        -->
      <div v-if="!isAuthenticated && isHomePage" class="logged-out-actions">
        <router-link 
          to="/cadastro" 
          class="btn register-button"
        >
          Criar Conta
        </router-link>
        <router-link 
          to="/login" 
          class="btn login-button"
        >
          Fazer Login
        </router-link>
      </div>

    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(useUiStore, ['isDarkMode']),
    ...mapState(useAuthStore, ['isAuthenticated']),
    isHomePage() {
      return this.$route.name === 'Home';
    }
  },
  methods: {
    ...mapActions(useUiStore, ['toggleDarkMode']),
    ...mapActions(useAuthStore, ['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.app-header { 
  width: 100%; 
  background-color: #ffffff; 
  padding: 25px 30px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.05); 
  border-bottom: 1px solid #e0e0e0; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  box-sizing: border-box; 
}
.header-content { 
  max-width: 1200px; 
  width: 100%; 
  display: flex; 
  align-items: center; 
  justify-content: flex-start; 
}
.header-logo-link { 
  display: flex; 
  align-items: center; 
  text-decoration: none; 
  color: inherit; 
}
.header-icon { 
  height: 70px; 
  margin-right: 15px; 
}
.header-title { 
  margin: 0; 
  font-size: 24px; 
  color: #2c3e50; 
  font-weight: 600; 
}
.spacer { 
  flex-grow: 1; 
}

.logged-in-actions,
.logged-out-actions {
  display: flex;
  gap: 15px;
}
.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.theme-toggle-button {
  background-color: transparent;
  color: #555;
  font-size: 20px;
  padding: 8px 12px;
  margin-right: 10px;
}
.theme-toggle-button:hover {
  background-color: #f0f0f0;
}
.logout-button { 
  background-color: #d93025; 
  color: white; 
}
.logout-button:hover { 
  background-color: #b0261e; 
}
.login-button { 
  background-color: #42b983; 
  color: white; 
}
.login-button:hover { 
  background-color: #36a473; 
}
.register-button { 
  background-color: #ffffff; 
  color: #42b983; 
  border: 2px solid #42b983; 
  padding: 8px 18px; 
}
.register-button:hover { 
  background-color: #e0f4e9; 
}
.profile-button { 
  background-color: #f0f0f0; 
  color: #333; 
  font-size: 18px; 
  padding: 8px 12px; 
}
.profile-button:hover { 
  background-color: #e0e0e0; 
  }
</style>