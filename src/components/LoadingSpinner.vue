<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <span class="loading-text">Carregando...</span>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 15px; 
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; 
  border-top: 5px solid #42b983; 
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.loading-text {
  font-size: 18px;
  color: #555;
  font-weight: 500;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>