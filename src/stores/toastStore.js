import { defineStore } from 'pinia'

let toastCounter = 0;

export const useToastStore = defineStore('toast', {
  
  state: () => ({
    toasts: [] 
  }),
  actions: {
    
    /**
     * Ação principal para mostrar um toast.
     * @param {string} message - A mensagem a ser exibida.
     * @param {string} [type='success'] - O tipo ('success' ou 'error').
     * @param {number} [duration=3000] - Duração em milissegundos.
     */
    showToast(message, type = 'success', duration = 3000) {
      const id = toastCounter++;
      
      this.toasts.unshift({
        id: id,
        message: message,
        type: type
      });
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
  }
})