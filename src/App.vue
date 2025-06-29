<script setup>
import { ref } from 'vue';
Card;
import Header from './components/Header.vue';
import Card from './components/Card.vue';
</script>

<template>
  <div class="w-3/4 m-auto bg-white rounded-xl shadow-xl mt-10">
    <Header />
    <div class="p-10">
      <div class="flex justify-between mb-14.5">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>
        <input type="text" placeholder="Поиск..." />
      </div>
      <div class=" flex gap-x-10 justify-between flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
