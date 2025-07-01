<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import axios from 'axios';
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer.vue';

const items = ref([]);
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
const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeCart(item);
  }
};

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
});
const filters = reactive({
  sortBy: 'title',
  searchQueryInput: '',
});
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};
const onChangeSearchInput = (event) => {
  filters.searchQueryInput = event.target.value;
};

const addtoFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      };
      item.isFavorite = true;
      const { data } = await axios.post('https://4bf6bdcf6597d96e.mokky.dev/favorites', obj);

      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(`https://4bf6bdcf6597d96e.mokky.dev/favorites/${item.favoriteId}`);

      item.favoriteId = null;
    }
  } catch (error) {
    console.log('ошибка API addtoFavorite', error);
  }
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://4bf6bdcf6597d96e.mokky.dev/favorites');
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);
      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: false, //состояние избранного
        favoriteId: null,
        favoriteId: favorite.id, //бек id
      };
    });
  } catch (error) {
    console.log('ошибка API favorites', error);
  }
};
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.searchQueryInput) {
      params.title = `*${filters.searchQueryInput}*`;
    }
    const { data } = await axios.get('https://4bf6bdcf6597d96e.mokky.dev/items', {
      params,
    });
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
    })); // обновляем данные
  } catch (error) {
    console.log('ошибка API items', error);
  }
};

onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});
watch(filters, fetchItems);
provide('addtoFavorite', addtoFavorite);

watch(cart, () => {
  //watch следит за корзиной, если она изменится обновляет состояние за счет (MAP) скорее всего 
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }));
});
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
      <div class="flex justify-between mb-14.5">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <div class="flex gap-5">
          <select @change="onChangeSelect" class="py-2 px-3 border border-gray-200 rounded-md">
            <option value="name">По названию</option>
            <option value="price">По Цене (дешевые)</option>
            <option value="-price">По Цене (дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-[14px] top-[15px]" src="/search.svg" alt="" />
            <input
              @input="onChangeSearchInput"
              class="border border-gray-200 rounded-md pl-[40px] py-[10px] px-[20px] outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <CardList :items="items" @addtoFavorite="addtoFavorite" @addToCart="onClickAddPlus" />
    </div>
  </div>
</template>

<style scoped></style>
