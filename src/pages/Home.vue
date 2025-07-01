<script setup>
import { inject, onMounted, reactive, ref, watch } from 'vue';
import CardList from '../components/CardList.vue';
import axios from 'axios';

const items = ref([]);
const addtoFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
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
const onChangeSearchInput = (event) => {
  filters.searchQueryInput = event.target.value;
};

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeCart(item);
  }
};

const { cart, addToCart, removeCart } = inject('cart');
const filters = reactive({
  sortBy: 'title',
  searchQueryInput: '',
});

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://4bf6bdcf6597d96e.mokky.dev/favorites');
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id);
      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: !!favorite,
        favoriteId: favorite?.id || null,
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
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];
  await fetchItems();
  await fetchFavorites();

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((Cartitem) => Cartitem.id === item.id),
  }));
});

watch(
  () => cart.value,
  () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
    }));
  },
  { deep: true },
);

watch(filters, fetchItems);
</script>

<template>
  <div>
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
</template>

<style scoped></style>
