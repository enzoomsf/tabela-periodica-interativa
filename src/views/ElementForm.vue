<template>
  <div class="page-wrapper">
    <AppHeader />

    <div class="form-container">
      <h2>{{ pageTitle }}</h2>

      <Breadcrumbs :links="breadcrumbLinks" />
      
      <div v-if="isLoading" class="loading-wrapper">
        <LoadingSpinner/>
      </div>
      <div v-else-if="error" class="error-message general-error">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit" v-else>
        <div v-if="formError" class="error-message general-error">
          {{ formError }}
        </div>
        
        <div class="form-group">
          <label for="name">Nome do Elemento:</label>
          <input type="text" id="name" v-model="form.name" :class="{ 'input-error': errors.name }">
          <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
        </div>
        <div class="form-group">
          <label for="symbol">Símbolo (1 ou 2 letras):</label>
          <input type="text" id="symbol" v-model="form.symbol" :class="{ 'input-error': errors.symbol }" maxlength="2" >
          <p v-if="errors.symbol" class="error-message">{{ errors.symbol }}</p>
        </div>
        <div class="form-group">
          <label for="atomicNumber">Número Atômico:</label>
          <input type="number" id="atomicNumber" v-model.number="form.atomicNumber" :class="{ 'input-error': errors.atomicNumber }">
          <p v-if="errors.atomicNumber" class="error-message">{{ errors.atomicNumber }}</p>
        </div>
        <div class="form-group">
          <label for="massaAtomica">Massa Atômica (Opcional):</label>
          <input type="number" step="any" id="massaAtomica" v-model.number="form.massaAtomica" :class="{ 'input-error': errors.massaAtomica }">
          <p v-if="errors.massaAtomica" class="error-message">{{ errors.massaAtomica }}</p>
        </div>

        <div class="form-group">
          <label for="grupo">Grupo (Opcional):</label>
          <select id="grupo" v-model="form.grupo">
            <option value="" disabled>Selecione um grupo</option>
            <option value="Não-metal">Não-metal</option>
            <option value="Gás Nobre">Gás Nobre</option>
            <option value="Metal Alcalino">Metal Alcalino</option>
            <option value="Metal Alcalino-terroso">Metal Alcalino-terroso</option>
            <option value="Semimetal">Semimetal</option>
            <option value="Halogênio">Halogênio</option>
            <option value="Metal de Transição">Metal de Transição</option>
            <option value="Outros Metais">Outros Metais</option>
            <option value="Lantanídeo">Lantanídeo</option>
            <option value="Actinídeo">Actinídeo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="estado">Estado (Opcional):</label>
          <select id="estado" v-model="form.estado">
            <option value="" disabled>Selecione um estado</option>
            <option value="Sólido">Sólido</option>
            <option value="Líquido">Líquido</option>
            <option value="Gás">Gás</option>
            <option value="Desconhecido">Desconhecido</option>
          </select>
        </div>
        
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="form.radioactive">
            É Radioativo?
          </label>
          <label>
            <input type="checkbox" v-model="form.abundant">
            É Abundante?
          </label>
        </div>
        <div class="button-row">
          <button type="submit" class="btn-submit" :disabled="isSaving">
            {{ isSaving ? 'Salvando...' : 'Salvar Elemento' }}
          </button>
          <router-link to="/tabela" class="btn-cancel">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useElementosStore } from '@/stores/elementosStore'
import AppHeader from '@/components/AppHeader.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  name: 'ElementForm',
  components: { AppHeader, Breadcrumbs },
  data() {
    return {
      form: {
        name: '',
        symbol: '',
        atomicNumber: null,
        massaAtomica: null,
        grupo: '',
        estado: '',
        radioactive: false,
        abundant: false
      },
      errors: {},
      isSaving: false,
      formError: '' 
    };
  },
  computed: {
    ...mapState(useElementosStore, {
      isLoading: 'isLoading',
      error: 'error',
      currentElement: 'currentElement'
    }),
    isEditing() {
      return !!this.$route.params.id;
    },
    pageTitle() {
      return this.isEditing ? 'Editar Elemento' : 'Adicionar Novo Elemento';
    },
    breadcrumbLinks() {
      const crumbs = [
        { text: 'Tabela', to: '/tabela' }
      ];

      if (this.isEditing) {
        if (this.form.name) {
          crumbs.push({ 
            text: this.form.name, 
            to: `/tabela/elemento/${this.form.id}` 
          });
          crumbs.push({ text: 'Editar' }); 
        } else {
          crumbs.push({ text: 'Carregando...' });
        }
      } else {
        crumbs.push({ text: 'Novo Elemento' }); 
      }
      
      return crumbs;
    }
  },
  mounted() {
    this.formError = '';
    if (this.isEditing) {
      this.loadElemento(this.$route.params.id);
    } else {
      this.clearCurrentElement();
      this.form = { estado: '', grupo: '', atomicNumber: null, massaAtomica: null };
    }
  },
  watch: {
    currentElement(newValue) {
      if (newValue && this.isEditing) {
        this.form = JSON.parse(JSON.stringify(newValue));
        if (!this.form.massaAtomica) this.form.massaAtomica = null;
        if (!this.form.atomicNumber) this.form.atomicNumber = null;
        if (!this.form.estado) this.form.estado = "";
        if (!this.form.grupo) this.form.grupo = "";
      }
    }
  },
  methods: {
    ...mapActions(useElementosStore, [
      'loadElemento', 
      'addElemento', 
      'updateElemento',
      'clearCurrentElement'
    ]),
    validateForm() { 
      this.errors = {}; 
      let isValid = true;
      if (!this.form.name.trim()) { this.errors.name = 'O nome é obrigatório.'; isValid = false; }
      const symbolRegex = /^[a-zA-Z]{1,2}$/;
      if (!this.form.symbol.trim()) { this.errors.symbol = 'O símbolo é obrigatório.'; isValid = false; }
      else if (!symbolRegex.test(this.form.symbol)) { this.errors.symbol = 'O símbolo deve ter 1 ou 2 letras.'; isValid = false; }
      if (!this.form.atomicNumber) { this.errors.atomicNumber = 'O N° atômico é obrigatório.'; isValid = false; }
      else if (this.form.atomicNumber <= 0) { this.errors.atomicNumber = 'O N° atômico deve ser > 0.'; isValid = false; }
      if (this.form.massaAtomica && this.form.massaAtomica <= 0) {
        this.errors.massaAtomica = 'A massa atômica deve ser um número maior que zero.';
        isValid = false;
      }
      return isValid;
    },
    async handleSubmit() {
      this.formError = '';
      if (!this.validateForm()) {
        return;
      }
      this.isSaving = true;
      try {
        const elementData = this.form; 

        if (this.isEditing) {
          await this.updateElemento(this.$route.params.id, elementData);
          this.$router.push({ name: 'Tabela', query: { toast: 'updated' } }); 

        } else {
          await this.addElemento(elementData);
          this.$router.push({ name: 'Tabela', query: { toast: 'created' } });
        }
        
      } catch (error) {
        console.error('Falha ao salvar elemento (componente):', error);
        this.formError = 'Erro ao salvar o elemento. Tente novamente.';
      } finally {
        this.isSaving = false;
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
.form-container { 
  max-width: 600px; 
  margin: 20px auto; 
  padding: 25px; 
  background: #fff; 
  border-radius: 8px; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
}
h2 { 
  text-align: center; 
  margin-top: 0; 
  margin-bottom: 25px; 
}
.loading-wrapper { 
  text-align: center; 
  padding: 40px; 
  font-size: 18px; 
  color: #555; 
  font-weight: 500; 
}
.form-group { 
  margin-bottom: 20px; 
}
.form-group label { 
  display: block; 
  margin-bottom: 5px; 
  font-weight: bold; 
}
.form-group input[type="text"],
.form-group input[type="number"],
.form-group select { 
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 4px; 
  box-sizing: border-box; 
  font-family: inherit; 
  font-size: 14px; 
  background-color: #fff; 
}
.checkbox-group { 
  display: flex; 
  gap: 20px; 
  margin-bottom: 25px; 
}
.checkbox-group label { 
  display: flex; 
  align-items: center; 
  gap: 5px; 
  font-weight: bold; 
}
.button-row { 
  display: flex; 
  justify-content: flex-end; 
  gap: 15px; 
  margin-top: 30px; 
  border-top: 1px solid #f0f0f0; 
  padding-top: 20px; 
}
.btn-submit, .btn-cancel { 
  padding: 12px 20px; 
  border: none; 
  border-radius: 6px; 
  font-weight: bold; 
  font-size: 15px; 
  cursor: pointer; 
  text-decoration: none; 
  transition: all 0.3s; 
}
.btn-submit { 
  background-color: #42b983; 
  color: white; 
}
.btn-submit:hover { 
  background-color: #36a473; 
}
.btn-cancel { 
  background-color: #aaa; 
  color: white; 
}
.btn-cancel:hover { 
  background-color: #888; 
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
.btn-submit:disabled { 
  background-color: #aaa; 
  cursor: not-allowed; 
  }
</style>