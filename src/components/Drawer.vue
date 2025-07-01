<script setup>
import { computed } from 'vue';
import CartListItem from './CartListItem.vue';
import DrawerHead from './DrawerHead.vue';
import InfoBlock from './InfoBlock.vue';

const { totalPrice, isCreateOrder } = defineProps({
  totalPrice: Number,
  disableButtonCart: Boolean,
});

const emit = defineEmits(['createOrder']);
</script>

<template>
  <div>
    <div class="Drawer fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
    <div
      class="qwe flex flex-col justify-between bg-white w-96 h-full fixed right-0 top-0 z-20 p-8"
    >
      <div class="zxc h-full flex flex-col">
        <DrawerHead />
        <CartListItem v-if="totalPrice" />
        <div v-if="!totalPrice" class="flex h-full items-center">
          <InfoBlock
            :title="'Корзина пустая'"
            :decription="'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'"
            imgUrl="package-icon.png"
          />
        </div>
      </div>

      <div v-if="totalPrice">
        <div class="flex items-baseline gap-1 mb-5">
          <span>Итого: </span>
          <div class="flex-1 border-b border-dashed border-[#dfdfdf]"></div>
          <span class="font-bold">{{ totalPrice }} ₽</span>
        </div>
        <button
          :disabled="disableButtonCart"
          @click="() => emit('createOrder')"
          class="bg-lime-400 disabled:bg-slate-400 w-full rounded-xl py-3 cursor-pointer text-white font-bold hover:bg-lime-600 transition"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
