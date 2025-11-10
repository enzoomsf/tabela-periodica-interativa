<template>
  <div class="home-wrapper">
    <AppHeader />
    <div class="home-container">
      <div class="hero-section">
        <h1 class="main-title">Seja Bem-vindo ao Sistema de Elementos Químicos</h1>
        <p class="subtitle">
          Gerencie e explore informações detalhadas sobre os elementos da tabela periódica.
          <br><br>
          Para começar, utilize os botões no canto superior direito
          para criar uma conta ou acessar o sistema.
        </p>
        </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  mounted() {

    if (this.authStore.isAuthenticated) {
      this.$router.push('/tabela');
    }
  }

}
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.home-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-image: url('/public/gifatomo.gif');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}
.home-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);  
  z-index: 1;
  transition: background-color 0.3s ease;
}
:global(body.dark-mode) .home-container::before {
  background-color: rgba(18, 18, 18, 0.9);
}
.hero-section {
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  position: relative;
  z-index: 2;
}
.main-title {
  font-size: 3.2em;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
}
.subtitle {
  font-size: 1.3em;
  color: #fff;
  margin-bottom: 30px;
  line-height: 1.5;
  max-width: 600px;
}
@media (max-width: 768px) {
}
:global(body.dark-mode) .main-title {
  color: #e0e0e0;
}
:global(body.dark-mode) .subtitle {
  color: #bdbdbd;
}
</style>