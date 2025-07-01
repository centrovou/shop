<script setup>
import { inject, ref } from 'vue';
import Cartitem from './Cartitem.vue';

const { cart, removeCart } = inject('cart');
</script>

<template>
  <div class="kek" v-auto-animate>
    <Cartitem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      @onclickRemove="removeCart(item)"
    />
  </div>
</template>

<style scoped></style>
