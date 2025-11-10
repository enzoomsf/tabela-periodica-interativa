<template>
  <div class="login-container">
    <h2>Login</h2>   
    <div v-if="loginError" class="error-message general-error">
      {{ loginError }}
    </div>
    <form @submit.prevent="handleLogin">
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          placeholder="seu@email.com"
          :class="{ 'input-error': emailError }" 
        />
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
      </div>    
      <div class="form-group">
        <label for="password">Senha:</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          placeholder="Sua senha"
          :class="{ 'input-error': passwordError }"
        />
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>    
    <div class="register-link">
      Não tem login? 
      <router-link to="/cadastro">Cadastre-se</router-link>
    </div>
    <div class="home-link">
      <router-link to="/">&larr; Voltar para a Home</router-link>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      loginError: '',
      isLoading: false
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    validateFields() {
      this.emailError = '';
      this.passwordError = '';
      this.loginError = '';
      let isValid = true;
      if (!this.password) {
        this.passwordError = 'A senha é obrigatória.';
        isValid = false;
      }
      if (!this.email) {
        this.emailError = 'O email é obrigatório.';
        isValid = false;
      } else if (!this.validateEmail(this.email)) {
        this.emailError = 'Por favor, insira um email válido.';
        isValid = false;
      }
      return isValid;
    },
    async handleLogin() {
      if (!this.validateFields()) {
        return;
      }
      this.isLoading = true;
      try {
        const authStore = useAuthStore();
        await authStore.login(this.email, this.password);
        this.$router.push('/tabela');
      } catch (error) {
        console.error('Falha no login (componente):', error);
        if (error.response && error.response.data) {
          this.loginError = error.response.data; 
        } else {
          this.loginError = 'Não foi possível conectar ao servidor.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container { 
  max-width: 400px; 
  margin: 60px auto; 
  padding: 25px; 
  border: 1px solid #ccc; 
  border-radius: 8px; 
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
}
h2 { 
  text-align: center; 
  margin-top: 0; 
}
.form-group { 
  margin-bottom: 20px; 
}
label { 
  display: block; 
  margin-bottom: 5px; 
  font-weight: bold; 
}
input[type="email"], input[type="password"] { 
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 4px; 
  box-sizing: border-box; 
}
button { 
  width: 100%; 
  padding: 12px; 
  background-color: #42b983; 
  color: white; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
  font-size: 16px; 
  font-weight: bold; 
}
button:hover { 
  background-color: #36a473; 
}
button:disabled { 
  background-color: #aaa; 
  cursor: not-allowed; 
}
.error-message { 
  color: #d93025; 
  font-size: 12px; 
  margin-top: 5px; 
  margin-bottom: 0; 
}
.input-error { 
  border-color: #d93025; 
}
.general-error { 
  border: 1px solid #d93025; 
  background-color: #fbe9e7; 
  padding: 10px; 
  border-radius: 4px; 
  font-size: 14px; 
  text-align: center;
  margin-bottom: 20px; 
}
.register-link { 
  text-align: center; 
  margin-top: 25px; 
  font-size: 14px; 
  color: #333; 
}
.register-link a { 
  color: #007bff; 
  text-decoration: none; 
  font-weight: bold; 
}
.register-link a:hover { 
  text-decoration: underline; 
}
.home-link {
  text-align: center;
  margin-top: 15px; 
  font-size: 14px;
}
.home-link a {
  color: #555; 
  text-decoration: none;
  font-weight: 500;
}
.home-link a:hover {
  text-decoration: underline;
}
</style>