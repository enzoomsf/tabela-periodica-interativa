import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TabelaView from '../views/TabelaView.vue'
import ElementForm from '../views/ElementForm.vue'
import ElementDetail from '../views/ElementDetail.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/cadastro', name: 'Cadastro', component: RegisterView },
  { path: '/tabela', name: 'Tabela', component: TabelaView, meta: { requiresAuth: true } },
  { path: '/tabela/novo', name: 'ElementoNovo', component: ElementForm, meta: { requiresAuth: true } },
  { path: '/tabela/editar/:id', name: 'ElementoEditar', component: ElementForm, meta: { requiresAuth: true } },
  { path: '/tabela/elemento/:id', name: 'ElementoDetalhe', component: ElementDetail, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'Perfil', component: ProfileView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    console.log('Guarda (Store): Acesso negado. Redirecionando para /login');
    next({ name: 'Login' });
  } 
  else if ((to.name === 'Login' || to.name === 'Cadastro') && authStore.isAuthenticated) {
    console.log('Guarda (Store): Usuário já logado. Redirecionando para /tabela');
    next({ name: 'Tabela' });
  } 
  else {
    next();
  }
});

export default router