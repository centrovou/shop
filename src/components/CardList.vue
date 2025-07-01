<script setup>
import { inject } from 'vue';
import Card from './Card.vue';

let { items } = defineProps({ items: Array });

const emit = defineEmits(['addtoFavorite', 'addToCart']);

</script>

<template>
  <div>
    <div class="flex gap-x-[59px] justify-start flex-wrap">
      <Card
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :imageUrl="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :isAdded="item.isAdded"
        :onClickAdd="() => emit('addToCart', item)"
        :onClickFavorite="() => emit('addtoFavorite', item)"
        :isFavorite="item.isFavorite"
      />
    </div>
  </div>
</template>

<style scoped></style>
