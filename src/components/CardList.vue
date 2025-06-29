<script setup>
import Card from './Card.vue';
</script>

<template>
  <div>
    <div class="flex gap-x-10 justify-between flex-wrap">
      <Card
        imageUrl="/sneakers/sneakers1.jpg"
        title="Мужские Кроссовки Nike Blazer Mid Suede"
        :price="12999"
        :isAdded="false"
        :isFavorite="false"
        :onClickAdd="() => console.log('zxc')"
      />
    </div>
  </div>
</template>

<style scoped></style>
