<template>
  <div id="app-wrapper">
    <router-view />
    <ToastWrapper />
  </div>
</template>

<script>
import ToastWrapper from '@/components/ToastWrapper.vue'
import { useUiStore } from '@/stores/uiStore'

export default {
  name: 'App',
  components: {
    ToastWrapper
  },
  mounted() {
    const uiStore = useUiStore();
    uiStore.initTheme();
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #2c3e50; 
  margin: 0;
  padding: 0;
  background-color: #ffffff; 
  transition: background-color 0.3s ease, color 0.3s ease;
}
body.dark-mode {
  background-color: #121212;
  color: #e0e0e0; 
}
body.dark-mode .tabela-container,
body.dark-mode .form-container,
body.dark-mode .detail-container,
body.dark-mode .profile-container,
body.dark-mode .login-container,
body.dark-mode .register-container {
  background-color: #1e1e1e; 
  border: 1px solid #333;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
body.dark-mode .app-header {
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode .header-title,
body.dark-mode .element-symbol,
body.dark-mode .element-name,
body.dark-mode .info-list li strong,
body.dark-mode .btn-delete-account,
body.dark-mode .btn-cancel,
body.dark-mode .btn-edit-password {
  color: #ffffff;
}
body.dark-mode .subtitle,
body.dark-mode label,
body.dark-mode .loading-text,
body.dark-mode .empty-list-message,
body.dark-mode .info-list li span,
body.dark-mode .atomic-number,
body.dark-mode .home-link a {
  color: #bdbdbd; 
}
body.dark-mode .breadcrumb-current {
  color: #e0e0e0;
}
body.dark-mode .form-group input[type="text"],
body.dark-mode .form-group input[type="number"],
body.dark-mode .form-group input[type="email"],
body.dark-mode .form-group input[type="password"],
body.dark-mode .form-group select {
  background-color: #333; 
  color: #e0e0e0; 
  border: 1px solid #555; 
}
body.dark-mode .form-group input::placeholder {
  color: #888;
}
body.dark-mode .form-group select option {
  background-color: #333;
  color: #e0e0e0;
}
body.dark-mode .element-card {
  background-color: #2b2b2b;
  border-color: #555;
}
body.dark-mode .element-card.is-abundant {
  border-color: #42b983;
}
body.dark-mode .element-card.is-radioactive {
  border-color: #d93025;
}
body.dark-mode .abundance-tag.rare {
  background-color: #444;
  color: #bdbdbd;
}
body.dark-mode .theme-toggle-button {
  color: #e0e0e0;
}
body.dark-mode .theme-toggle-button:hover {
  background-color: #333;
}
body.dark-mode .profile-button {
  background-color: #333;
  color: #e0e0e0;
}
body.dark-mode .profile-button:hover {
  background-color: #444;
}
body.dark-mode .register-button {
  background-color: #1e1e1e;
  border-color: #42b983;
  color: #42b983;
}
body.dark-mode .register-button:hover {
  background-color: #333;
}
body.dark-mode .btn-cancel {
  background-color: #444;
  color: #e0e0e0;
}
body.dark-mode .btn-cancel:hover {
  background-color: #555;
}
</style>