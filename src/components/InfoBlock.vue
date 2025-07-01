<script setup>
defineProps({
  imgUrl: String,
  title: String,
  decription: String,
});
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <img width="120" height="120" :src="imgUrl" alt="qwe" />
    <span class="mt-5 text-[22px] font-bold">{{ title }}</span>
    <span class="text-gray-400 mt-3">{{ decription }}</span>
  </div>
</template>

<style scoped></style>
