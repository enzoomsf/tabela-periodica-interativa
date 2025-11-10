<template>
  <div class="toast-wrapper">
    <TransitionGroup name="toast" tag="div">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        class="toast" 
        :class="`toast-${toast.type}`"
      >
        <span class="toast-icon">
          {{ toast.type === 'success' ? '✅' : '❌' }}
        </span>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useToastStore } from '@/stores/toastStore'

export default {
  name: 'ToastWrapper',
  computed: {
    ...mapState(useToastStore, ['toasts'])
  }
}
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999; 
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  min-width: 250px;
}
.toast-success {
  background-color: #36a473;
  border-left: 5px solid #42b983; 
}
.toast-error {
  background-color: #b0261e; 
  border-left: 5px solid #d93025; 
}
.toast-icon {
  font-size: 18px;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>