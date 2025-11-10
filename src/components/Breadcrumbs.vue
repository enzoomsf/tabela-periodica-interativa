<template>
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
        <!-- 
          é feito um loop no array 'links' recebido via props. 'index' é a posição do item no array (0, 1, 2...).
        -->
      <li 
        v-for="(link, index) in links" 
        :key="index" 
        class="breadcrumb-item"
      >
          <!-- 
            Se o objeto 'link' tiver a propriedade 'to' (ex: { text: 'Tabela', to: '/tabela' }), 
            ele é renderizado como um <router-link> clicável.
          -->
        <router-link v-if="link.to" :to="link.to" class="breadcrumb-link">
          {{ link.text }}
        </router-link>
          <!-- 
            Caso contrário (v-else), significa que este é o último item da lista, (ex: { text: 'Detalhes' }), que é a página atual.
            Renderizado apenas como texto simples (<span>).
          -->
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ link.text }}
        </span>
          <!-- 
            Mostra o separador '>' APENAS se o 'index' atual for menor que o último item (links.length - 1).
            Isso evita que um '>' apareça no final do breadcrumb.
          -->
        <span v-if="index < links.length - 1" class="separator" aria-hidden="true">
          >
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    links: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.breadcrumb-nav {
  padding: 10px 0;
  margin-bottom: 10px;
}
.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap; 
  list-style: none;
  padding: 0;
  margin: 0;
}
.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
}
.breadcrumb-link {
  color: #007bff; 
  text-decoration: none;
}
.breadcrumb-link:hover {
  text-decoration: underline;
}
.breadcrumb-current {
  color: #555; 
  font-weight: 600; 
}
.separator {
  margin: 0 8px;
  color: #999; 
  user-select: none; 
}
</style>