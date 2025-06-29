<script setup>
import { ref } from 'vue';
Card;
import Header from './components/Header.vue';
import Card from './components/Card.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer.vue';
</script>

<template>
  <Drawer />
  <div class="w-3/4 m-auto bg-white rounded-xl shadow-xl mt-10">
    <Header />
    <div class="p-10">
      <div class="flex justify-between mb-14.5">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>
        <input type="text" placeholder="Поиск..." />
      </div>
      <CardList />
    </div>
  </div>
</template>

<style scoped></style>
