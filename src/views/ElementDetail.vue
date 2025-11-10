<template>
  <div class="page-wrapper">
    <AppHeader/>

    <div class="detail-container">

    <Breadcrumbs :links="breadcrumbLinks" />
      
      <div v-if="isLoading" class="loading-wrapper">
        <LoadingSpinner/>
      </div>

      <div v-else-if="error" class="error-message general-error">
        {{ error }}
      </div>

      <div v-else-if="currentElement" class="element-content">
        
        <div class="element-header">
          <router-link to="/tabela" class="back-link">&larr; Voltar para a Tabela</router-link>
          
          <div class="header-actions">
            <router-link :to="editUrl" class="btn-edit">
              ✏️ Editar
            </router-link>
            <button 
              @click="handleDelete" 
              class="btn-delete"
              :disabled="isDeleting"
            >
              {{ isDeleting ? 'Excluindo...' : '🗑️ Excluir' }}
            </button>
          </div>
        </div>

        <div class="element-display-card">
          <span class="atomic-number">{{ currentElement.atomicNumber }}</span>
          <div class="symbol">{{ currentElement.symbol }}</div>
          <div class="name">{{ currentElement.name }}</div>
          <div class="mass">{{ currentElement.massaAtomica }}</div>
        </div>

        <h3>Detalhes do Elemento</h3>
        <ul class="info-list">
          <li><strong>Grupo:</strong> <span>{{ currentElement.grupo }}</span></li>
          <li><strong>Estado (Padrão):</strong> <span>{{ currentElement.estado }}</span></li>
          <li>
            <strong>Radioativo:</strong>
            <span :class="currentElement.radioactive ? 'danger' : 'safe'">
              {{ currentElement.radioactive ? 'Sim' : 'Não' }}
            </span>
          </li>
          <li>
            <strong>Abundância:</strong>
            <span :class="currentElement.abundant ? 'success' : 'neutral'">
              {{ currentElement.abundant ? 'Abundante' : 'Raro' }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useElementosStore } from '@/stores/elementosStore'
import AppHeader from '@/components/AppHeader.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue' 

export default {
  name: 'ElementDetail',
  components: { AppHeader, Breadcrumbs },
  data() {
    return {
      isDeleting: false 
    };
  },
  computed: {
    ...mapState(useElementosStore, ['currentElement', 'isLoading', 'error']),
    
    editUrl() {
      if (this.currentElement) {
        return `/tabela/editar/${this.currentElement.id}`;
      }
      return '/tabela'; 
    },
    breadcrumbLinks() {
      const crumbs = [
        { text: 'Tabela', to: '/tabela' }
      ];
      
      if (this.currentElement) {
        crumbs.push({ text: this.currentElement.name }); 
      } else if (this.isLoading) {
        crumbs.push({ text: 'Carregando...' });
      }
      
      return crumbs;
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.loadElemento(id);
  },
  methods: {
    ...mapActions(useElementosStore, ['loadElemento', 'deleteElemento']),
  
    async handleDelete() {
      const confirmed = window.confirm(
        `Você tem certeza que quer excluir o elemento "${this.currentElement.name}"?`
      );
      if (!confirmed) return; 
      
      this.isDeleting = true;
      try {
        await this.deleteElemento(this.currentElement.id);

        this.$router.push({ name: 'Tabela', query: { toast: 'deleted' } });
        
      } catch (error) {
        console.error('Falha ao excluir (componente):', error);
      } finally {
        this.isDeleting = false;
      }
    }
  }
}
</script>

<style scoped>
.page-wrapper { 
  background-color: #f6f8fa; 
  min-height: 100vh; 
}
.detail-container { 
  max-width: 700px; 
  margin: 20px auto; 
  padding: 25px; 
  background: #fff; 
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
}
.element-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 1px solid #eee; 
  padding-bottom: 15px; 
  margin-bottom: 25px; 
}
.back-link { 
  color: #007bff; 
  text-decoration: none; 
  font-weight: 500; 
}
.header-actions { 
  display: flex; 
  gap: 10px; 
}
.btn-edit { 
  background-color: #ffc107; 
  color: #212529; 
  padding: 8px 14px; 
  border-radius: 6px; 
  text-decoration: none; 
  font-weight: bold; 
  font-size: 15px; 
  transition: background-color 0.3s; 
}
.btn-edit:hover { 
  background-color: #e0a800; 
}
.btn-delete { 
  background-color: #d93025; 
  color: white; 
  border: none; 
  font-family: inherit; 
  padding: 8px 14px; 
  border-radius: 6px; 
  font-weight: bold; 
  font-size: 15px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}
.btn-delete:hover { 
  background-color: #b0261e; 
}
.btn-delete:disabled { 
  background-color: #aaa; 
  cursor: not-allowed; 
}
.element-display-card { 
  border: 2px solid #333; 
  border-radius: 10px; 
  padding: 20px; 
  text-align: center; 
  position: relative; 
  background-color: #fdfdfd; 
  margin-bottom: 30px; 
}
.element-display-card .atomic-number { 
  position: absolute; 
  top: 10px; 
  left: 15px; 
  font-size: 20px; 
  font-weight: 600; 
  color: #555; 
}
.element-display-card .symbol { 
  font-size: 80px; 
  font-weight: bold; 
  color: #2c3e50; 
  line-height: 1.1; 
}
.element-display-card .name { 
  font-size: 32px; 
  font-weight: 500; 
  margin-bottom: 5px; 
}
.element-display-card .mass { 
  font-size: 18px; 
  color: #777; 
}
h3 { 
  border-bottom: 2px solid #42b983; 
  padding-bottom: 5px; 
  margin-bottom: 15px; 
}
.info-list { 
  list-style: none; 
  padding: 0; 
}
.info-list li { 
  display: flex; 
  justify-content: space-between; 
  padding: 12px 5px; 
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
}
.danger { 
  color: #d93025; 
  font-weight: bold; 
}
.safe { 
  color: #36a473; 
}
.success { 
  color: #36a473; 
  font-weight: bold; 
}
.neutral { 
  color: #555; 
}
.loading-wrapper, .general-error { 
  text-align: center; 
  padding: 40px; 
  font-size: 18px; 
  font-weight: 500; 
}
.general-error { 
  border: 1px solid #d93025; 
  background-color: #fbe9e7; 
  color: #d93025; 
  border-radius: 4px; 
}
@media (max-width: 767px) {
  .detail-container {
    padding: 15px;
  }

  .element-header {
    flex-direction: column; 
    align-items: flex-start; 
    gap: 15px; 
  }

  .header-actions {
    width: 100%; 
    display: flex;
    gap: 10px;
  }

  .btn-edit, .btn-delete {
    flex-grow: 1; 
    text-align: center;
  }

  .element-display-card .symbol {
    font-size: 60px; 
  }
  .element-display-card .name {
    font-size: 24px;
  }
  .element-display-card .atomic-number {
    font-size: 16px;
  }

  .info-list li {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>