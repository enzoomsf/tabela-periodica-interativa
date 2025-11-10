import { defineStore } from 'pinia'
import apiClient from '@/api'
import { useToastStore } from './toastStore'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    /** O 'state' é inicializado lendo o localStorage para manter a sessão do usuário ativa após recarregar a página. */
    token: localStorage.getItem('userToken') || null,
    user: JSON.parse(localStorage.getItem('userData')) || null 
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await apiClient.post('/login', {
          email: email,
          password: password
        });

        const token = response.data.accessToken;
        const user = response.data.user; 
        // Persiste a sessão no localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(user)); 
        
        // Atualiza o state
        this.token = token;
        this.user = user; 

      } catch (error) {
        // Se o login da API falhar, garante que a sessão local seja limpa.
        this.logout();
        // 'throw error' é crucial para que o componente (LoginView) possa capturar o erro e exibir a mensagem na tela.
        throw error;
      }
    },

    async register(userData) {
      try {
        await apiClient.post('/register', userData);
      } catch (error) {
        // Envia o erro de volta para o RegisterView exibir
        throw error;
      }
    },
    /** Limpa a sessão do usuário. É crucial limpar ambos: localStorage (persistência) e o 'state' (reatividade). */
    logout() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData'); 
      
      this.token = null;
      this.user = null; 
    },
    async deleteAccount() {
      const toastStore = useToastStore();
      try {
        // Pega o ID do usuário do 'state' (salvo no login)
        const userId = this.user.id;
        await apiClient.delete(`/users/${userId}`);
        toastStore.showToast('Conta deletada com sucesso.', 'success');
        // Limpa a sessão local após o sucesso
        this.logout();
      } catch (error) {
         console.error('Erro ao deletar conta:', error);
         toastStore.showToast('Falha ao deletar conta.', 'error');
         throw error;
      } 
    }
    }
})