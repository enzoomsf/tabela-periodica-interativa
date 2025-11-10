<template>
  <router-link :to="detailUrl" class="card-link">
    <div 
      class="element-card" 
      :class="{ 
        'is-radioactive': element.radioactive, 
        'is-abundant': element.abundant 
      }"
    >
      <div class="card-header">
        <span class="atomic-number">{{ element.atomicNumber }}</span>
        
        <div class="status-icons">
            <!-- 
              O ícone de radioativo só é renderizado no HTML se 'element.radioactive' for verdadeiro.
            -->
          <span v-if="element.radioactive" class="radioactive-icon" title="Radioativo">
            ☢️
          </span>
          
          </div>
      </div>
      
      <div class="element-symbol">
        {{ element.symbol }}
      </div>
      
      <div class="element-name">
        {{ element.name }}
      </div>
      
      <div class="card-footer">
            <!-- 
              Se 'element.abundant' for verdadeiro, mostra "Abundante". Caso contrário (v-else), mostra "Raro".
            -->
        <span v-if="element.abundant" class="abundance-tag">
          Abundante
        </span>
        <span v-else class="abundance-tag rare">
          Raro
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ElementCard',
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  computed: {
    detailUrl() {
      return `/tabela/elemento/${this.element.id}`;
    }
  }
}
</script>

<style scoped>
.card-link {
  text-decoration: none; 
  color: inherit; 
}
.element-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}
.element-card {
  border: 2px solid #333;
  border-radius: 8px;
  padding: 10px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;
  cursor: pointer; 
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}
.atomic-number {
  font-size: 14px;
  font-weight: bold;
  color: #555;
}
.status-icons {
  display: flex;
  gap: 8px;
}
.radioactive-icon {
  font-size: 16px;
  color: #d93025;
}
.element-symbol { font-size: 48px; font-weight: bold; text-align: center; color: #2c3e50; line-height: 1; }
.element-name { font-size: 14px; text-align: center; color: #333; }
.card-footer { text-align: center; height: 20px; }
.abundance-tag { font-size: 12px; font-weight: bold; padding: 3px 6px; border-radius: 4px; color: white; }
.is-abundant { border-color: #42b983; }
.is-abundant .abundance-tag { background-color: #42b983; }
.abundance-tag.rare { background-color: #aaa; }
.is-radioactive { border-color: #d93025; animation: pulse-border 1.5s infinite; }
@keyframes pulse-border {
  0% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(217, 48, 37, 0); }
  100% { box-shadow: 0 0 0 0 rgba(217, 48, 37, 0); }
}
</style>