<script setup>
import CardList from '../components/CardList.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const favoritesItemPage = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://4bf6bdcf6597d96e.mokky.dev/favorites?_relations=items',
    );
    favoritesItemPage.value = data.map((obj) => obj.item);
  } catch (error) {
    console.log('ошибка API favorites', error);
  }
});
</script>

<template>
  <div class="mb-14.5 text-3xl font-bold">Закладки</div>
  <CardList :items="favoritesItemPage" isFavoritesShow isPlusHady />
</template>

<style scoped></style>
