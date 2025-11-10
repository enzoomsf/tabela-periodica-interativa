<template>
  <div class="register-container">
    <h2>Crie sua Conta</h2>   
    <div v-if="registerError" class="error-message general-error">
      {{ registerError }}
    </div>
    <form @submit.prevent="handleRegister">   
      <div class="form-group">
        <label for="name">Nome:</label>
        <input 
          type="text" 
          id="name" 
          v-model="name"
          placeholder="Seu nome completo"
          :class="{ 'input-error': nameError }"
        />
        <p v-if="nameError" class="error-message">{{ nameError }}</p>
      </div>
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
          placeholder="Mínimo 6 caracteres"
          :class="{ 'input-error': passwordError }"
        />
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
      </div>
      <div class="form-group">
        <label for="passwordConfirm">Confirmar Senha:</label>
        <input 
          type="password" 
          id="passwordConfirm" 
          v-model="passwordConfirm"
          placeholder="Repita a senha"
          :class="{ 'input-error': passwordConfirmError }"
        />
        <p v-if="passwordConfirmError" class="error-message">{{ passwordConfirmError }}</p>
      </div>     
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Criando conta...' : 'Criar Conta' }}
      </button>
    </form>
    <div class="login-link">
      Já tem uma conta? 
      <router-link to="/login">Faça o login</router-link>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      passwordConfirmError: '',
      registerError: '',
      isLoading: false
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    validateFields() {
      this.nameError = '';
      this.emailError = '';
      this.passwordError = '';
      this.passwordConfirmError = '';
      this.registerError = '';
      let isValid = true;
      if (!this.name) { this.nameError = 'O nome é obrigatório.'; isValid = false; }
      if (!this.email) { this.emailError = 'O email é obrigatório.'; isValid = false; }
      else if (!this.validateEmail(this.email)) { this.emailError = 'Por favor, insira um email válido.'; isValid = false; }
      if (!this.password) { this.passwordError = 'A senha é obrigatória.'; isValid = false; }
      else if (this.password.length < 6) { this.passwordError = 'A senha deve ter no mínimo 6 caracteres.'; isValid = false; }
      if (this.password !== this.passwordConfirm) { this.passwordConfirmError = 'As senhas não coincidem.'; isValid = false; }
      return isValid;
    },

    async handleRegister() {
      if (!this.validateFields()) {
        return;
      }
      this.isLoading = true;

      try {
        const authStore = useAuthStore();
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        
        await authStore.register(newUser);
        this.$router.push('/login');

      } catch (error) {
        console.error('Falha no cadastro (componente):', error);
        if (error.response && error.response.data) {
          this.registerError = error.response.data;
        } else {
          this.registerError = 'Não foi possível conectar ao servidor.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.register-container {
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
input[type="email"], input[type="password"], input[type="text"] { 
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
.login-link { 
  text-align: center; 
  margin-top: 25px; 
  font-size: 14px; 
  color: #333; 
}
.login-link a { 
  color: #007bff; 
  text-decoration: none; 
  font-weight: bold; 
}
.login-link a:hover { 
  text-decoration: underline; 
}
.error-message { 
  color: #d90000; 
  font-size: 12px; 
  margin-top: 5px; 
  margin-bottom: 0; 
}
.input-error { 
  border-color: #d90000; 
}
button:disabled { 
  background-color: #aaa; 
  cursor: not-allowed; 
}
.general-error { 
  border: 1px solid #d90000; 
  background-color: #fbe9e7; 
  padding: 10px; 
  border-radius: 4px; 
  font-size: 14px; 
  text-align: center; 
  margin-bottom: 20px; 
  }
</style>