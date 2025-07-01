<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import axios from 'axios';
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';
import Home from './pages/Home.vue';

const drawerOpen = ref(false);
const cart = ref([]); //список товаров в корзине
const isCreateOrder = ref(false);

const createOrder = async (item) => {
  try {
    isCreateOrder.value = true;
    const { data } = await axios.post('https://4bf6bdcf6597d96e.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value,
    });

    cart.value = [];
    return data;
  } catch (error) {
    console.log('ошибка API createOrder', error);
  } finally {
    isCreateOrder.value = false;
  }
};

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});
const emmtyCart = computed(() => {
  return cart.value.length === 0;
});
const disableButtonCart = computed(() => {
  return isCreateOrder.value || emmtyCart.value;
});

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};
const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
};

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  removeCart,
  addToCart,
});

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  },
  {
    deep: true,
  },
);
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    @createOrder="createOrder"
    :disableButtonCart="disableButtonCart"
  />
  <div class="w-3/4 m-auto bg-white rounded-xl shadow-xl mt-10">
    <Header :totalPrice="totalPrice" @openDrawer="openDrawer" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
