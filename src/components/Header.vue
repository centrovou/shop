<script setup>
defineProps({
  totalPrice: Number,
});
const emit = defineEmits(['openDrawer']);
</script>

<template>
  <div>
    <header class="flex justify-between border-b border-slate-300 px-8 py-8">
      <RouterLink to="/">
        <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" class="w-10" />
          <div>
            <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
            <p class="text-slate-400">Магазин лучших кроссовок</p>
          </div>
        </div>
      </RouterLink>

      <ul class="flex items-center gap-8">
        <li
          @click="emit('openDrawer')"
          class="flex items-center cursor-pointer text-sm font-normal gap-2.5 hover:text-black text-gray-500"
        >
          <img src="/cart.svg" alt="cart" />
          <span class="font-medium">{{ totalPrice }} руб.</span>
        </li>

        <RouterLink to="/favorites">
          <li
            class="flex items-center cursor-pointer text-sm font-normal gap-2.5 hover:text-black text-gray-500"
          >
            <img src="/heart.svg" alt="cart" />
            <span class="font-normal">Закладки</span>
          </li></RouterLink
        >
        <li
          class="flex items-center cursor-pointer text-sm font-normal gap-2.5 hover:text-black text-gray-500"
        >
          <img src="/profile.svg" alt="cart" />
          <span class="font-normal">Профиль</span>
        </li>
      </ul>
    </header>
  </div>
</template>

<style scoped></style>
