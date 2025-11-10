import { defineStore } from 'pinia'
import apiClient from '@/api'
import { useToastStore } from './toastStore'

export const useElementosStore = defineStore('elementos', {
  
  state: () => ({
    elementos: [],
    currentElement: null,
    isLoading: false,
    error: ''
  }),

  getters: {
    totalElementos: (state) => state.elementos.length
  },
  actions: { 
    async fetchElementos() {
      this.isLoading = true;
      this.error = '';
      try {
        const response = await apiClient.get('/elementos');
        this.elementos = response.data;
      } catch (error) {
        console.error('Erro ao buscar elementos:', error);
        this.error = 'Falha ao carregar elementos.';
      } finally {
        // 'finally' garante que o 'isLoading' (spinner) seja desligado, mesmo se a API der erro.
        this.isLoading = false;
      }
    },
    async loadElemento(id) {
      this.isLoading = true;
      this.error = '';
      this.currentElement = null;
      try {
        const response = await apiClient.get(`/elementos/${id}`);
        this.currentElement = response.data;
      } catch (error) {
        console.error('Erro ao carregar elemento:', error);
        this.error = 'Falha ao carregar elemento.';
      } finally {
        this.isLoading = false;
      }
    },
    async addElemento(elementData) {
      const toastStore = useToastStore();
      try {
        await apiClient.post('/elementos', elementData);
      } catch (error) {
        toastStore.showToast('Erro ao criar elemento.', 'error');
        throw error;
      }
    },
    async updateElemento(id, elementData) {
      const toastStore = useToastStore();
      try {
        await apiClient.put(`/elementos/${id}`, elementData);
      } catch (error) {
        toastStore.showToast('Erro ao atualizar elemento.', 'error');
        throw error;
      }
    },
    async deleteElemento(id) {
      const toastStore = useToastStore();
      try {
        await apiClient.delete(`/elementos/${id}`);
      } catch (error) {
        toastStore.showToast('Erro ao excluir elemento.', 'error');
        throw error;
      }
    },
    clearCurrentElement() {
      this.currentElement = null;
    }
  }
})