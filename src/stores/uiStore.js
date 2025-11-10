import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isDarkMode: localStorage.getItem('darkMode') === 'true'
  }),
  
  actions: {
    _applyTheme() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
    initTheme() {
      this._applyTheme();
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
      this._applyTheme();
    }
  }
})