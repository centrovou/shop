<script setup>
import { inject } from 'vue';
import Card from './Card.vue';

let { items, isFavoritesShow } = defineProps({ items: Array, isFavoritesShow: Boolean });

const emit = defineEmits(['addtoFavorite', 'addToCart']);
</script>

<template>
  <div>
    <div class="flex gap-x-[59px] justify-start flex-wrap" v-auto-animate>
      <Card
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :imageUrl="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :isAdded="item.isAdded"
        :onClickAdd="isFavoritesShow ? null : () => emit('addToCart', item)"
        :onClickFavorite="isFavoritesShow ? null : () => emit('addtoFavorite', item)"
        :isFavorite="item.isFavorite"
        :showFavoriteButton="!isFavoritesShow"
      </Card>
    
    </div>
  </div>
</template>

<style scoped></style>
