<template>
  <div class="page-wrapper">
    <AppHeader />
  <div class="tabela-container">
    <div class="actions-bar">
      <router-link to="/tabela/novo" class="btn-add-new">
        + Adicionar novo Elemento
      </router-link>
    </div>
    <div class="content">      
      <div v-if="isLoading" class="loading-wrapper">
        <LoadingSpinner />
      </div>
      <div v-if="error" class="error-message">
        <strong>Falha na Requisição:</strong> {{ error }}
      </div>     
      <div v-else-if="!isLoading && elementos.length > 0" class="element-grid">
        <ElementCard 
            v-for="el in elementos" 
            :key="el.id" 
            :element="el" 
          />
      </div>
      <div v-else class="empty-list-message">
        Nenhum elemento encontrado.
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useElementosStore } from '@/stores/elementosStore'
import { useToastStore } from '@/stores/toastStore'
import AppHeader from '@/components/AppHeader.vue'
import ElementCard from '@/components/ElementCard.vue' 
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'TabelaView',
  components: { 
    AppHeader, 
    ElementCard, 
    LoadingSpinner 
  },
  
  computed: {
    ...mapState(useElementosStore, ['elementos', 'isLoading', 'error'])
  },

  mounted() {
    this.fetchElementos();
    this.checkRouteForToast();
  },

  methods: {
    ...mapActions(useElementosStore, ['fetchElementos']),

    checkRouteForToast() {
      const toastType = this.$route.query.toast;

      if (!toastType) return; 

      const toastStore = useToastStore();
      
      if (toastType === 'created') {
        toastStore.showToast('Elemento criado com sucesso!', 'success');
      } else if (toastType === 'updated') {
        toastStore.showToast('Elemento atualizado com sucesso!', 'success');
      } else if (toastType === 'deleted') {
        toastStore.showToast('Elemento excluído com sucesso!', 'success');
      }
      this.$router.replace({ query: {} });
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
}
.tabela-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff; 
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.actions-bar {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}
.btn-add-new {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  transition: background-color 0.3s;
}
.btn-add-new:hover {
  background-color: #0056b3;
}
.content { 
  padding-top: 20px; 
}
.loading-wrapper {
  text-align: center;
  padding: 40px;
}
.error-message { 
  margin-top: 20px; 
  padding: 10px; 
  border: 1px solid #d93025; 
  background-color: #fbe9e7; 
  color: #d93025; 
  border-radius: 4px; 
}
.empty-list-message { 
  text-align: center; 
  padding: 40px; 
  font-size: 18px; 
  color: #777; 
  font-weight: 500; 
}
.element-grid { 
  margin-top: 20px; 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); 
  gap: 15px; 
}
@media (max-width: 767px) {
  .tabela-container {
    padding: 10px;
    margin: 10px auto;
  }
  .actions-bar {
    padding-bottom: 15px;
  }
  .btn-add-new {
    width: 100%; 
    text-align: center;
    box-sizing: border-box; 
  }
  .element-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
}
</style>