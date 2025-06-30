<script setup>
import Card from './Card.vue';

let { items } = defineProps({ items: Array });

const emit = defineEmits(['addtoFavorite']);
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
        :onClickAdd="onClickAdd"
        :onClickFavorite="() => emit('addtoFavorite', item)"
        :isFavorite="item.isFavorite"
      />
    </div>
  </div>
</template>

<style scoped></style>
