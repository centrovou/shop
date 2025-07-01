<script setup>
const emit = defineEmits(['onclickRemove']);
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
});
</script>

<template>
  <div class="flex items-center w-full border border-slate-200 p-4 rounded-2xl gap-4 mb-5">
    <img class="w-15 h-15" :src="imageUrl" alt="cart" />
    <div class="flex flex-col">
      <span class="text-sm font-normal">{{ title }}</span>
      <div class="flex justify-between mt-2">
        <span class="font-bold">{{ price }} руб.</span>
      </div>
    </div>
    <img
      @click="emit('onclickRemove')"
      class="opacity-50 hover:opacity-100 cursor-pointer"
      src="/close.svg"
      alt="remove"
    />
  </div>
</template>

<style scoped></style>
