<template>
  <div class="page-wrapper">
    <AppHeader />
    <div class="profile-container">    
      <Breadcrumbs :links="breadcrumbLinks" />
      <h2>Meu Perfil</h2>

      <div v-if="user" class="profile-info">
        <h3>Informações do Usuário</h3>
        <ul class="info-list">
          <li><strong>Nome:</strong> <span>{{ user.name }}</span></li>
          <li><strong>Email:</strong> <span>{{ user.email }}</span></li>
        </ul>
      </div>     
      <div v-else class="loading-message">
        <LoadingSpinner />
        <p>(Carregando dados do usuário...)</p>
      </div>
      <div class="profile-actions">
        <h3>Gerenciamento da Conta</h3>      
        <button 
          @click="handleDeleteAccount"
          class="btn-action btn-delete-account" 
          :disabled="isDeleting"
        >
          {{ isDeleting ? 'Excluindo...' : 'Excluir Minha Conta' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'ProfileView',
  components: { 
    AppHeader, 
    Breadcrumbs, 
    LoadingSpinner 
  },
  data() {
    return {
      isDeleting: false
    };
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    breadcrumbLinks() {
      return [
        { text: 'Tabela', to: '/tabela' },
        { text: 'Meu Perfil' }
      ];
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['deleteAccount']),
    async handleDeleteAccount() {
      const confirmed = window.confirm(
        'Você tem CERTEZA que quer excluir sua conta?\nEsta ação é permanente e todos os seus dados serão perdidos.'
      );
      if (!confirmed) return;

      this.isDeleting = true;
      try {
        await this.deleteAccount();
        this.$router.push('/login');

      } catch (error) {
        console.error("Falha ao excluir conta (view):", error);
      } finally {
        this.isDeleting = false;
      }
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
}
.profile-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 25px;
}
h2 {
  font-size: 2.2em;
  color: #2c3e50;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
  margin-top: 10px;
}
.profile-info { 
    margin-top: 20px; 
}
.info-list { 
    list-style: none; 
    padding: 0; 
    border: 1px solid #eee; 
    border-radius: 8px; 
    overflow: hidden; 
}
.info-list li { 
    display: flex; 
    justify-content: space-between; 
    padding: 16px 20px; 
    font-size: 17px; 
    border-bottom: 1px solid #f0f0f0; 
}
.info-list li:last-child { 
    border-bottom: none; 
}
.info-list li strong { 
    color: #333; 
}
.info-list li span { 
    font-weight: 500; 
    color: #555; 
}
.loading-message { 
    padding: 40px; 
    text-align: center; 
    color: #777; 
}
.profile-actions { 
    margin-top: 40px; 
    padding-top: 20px; 
    border-top: 1px solid #eee; 
}
.profile-actions h3 { 
    font-size: 1.5em; 
    margin-bottom: 20px; 
}
.btn-action { 
    padding: 12px 20px; 
    border: none; 
    border-radius: 6px; 
    font-weight: bold; 
    font-size: 15px; 
    cursor: pointer; 
    margin-right: 15px; 
    transition: all 0.3s; 
}
.btn-action:disabled { 
    background-color: #aaa; 
    cursor: not-allowed; 
    opacity: 0.7; 
}
.btn-delete-account { 
    background-color: #d93025; 
    color: white; 
}
.btn-delete-account:hover:not(:disabled) { 
    background-color: #b0261e; 
    }
</style>