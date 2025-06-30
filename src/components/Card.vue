<script setup>
const { id, imageUrl, title, price } = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
});
</script>

<template>
  <div>
    <div
      class="relative gap-1.5 border border-slate-200 rounded-3xl w-55 p-7 cursor-pointer flex flex-col gap-y-3.5 hover:-translate-y-2 hover:shadow-xl transition mb-10"
    >
      <img
        class="absolute top-7 left-5"
        :src="!isFavorite ? 'like-1.svg' : 'like-2.svg'"
        alt="like"
        @click="onClickFavorite"
      />
      <img width="133" :src="imageUrl" alt="sneakers" />
      <p class="text-sm">{{ title }}</p>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="text-slate-400">Цена:</span>
          <span class="font-bold">{{ price }} руб.</span>
        </div>
        <img @click="onClickAdd" :src="!isAdded ? 'plus.svg' : 'checked.svg'" alt="ЯЧС" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
