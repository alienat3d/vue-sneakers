<script setup>
import { onMounted, ref, reactive, provide, watch } from 'vue'
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerElement from './components/DrawerElement.vue'

const goods = ref([])
// 2.0 Теперь нужно добиться, чтобы по клику на кнопку "+" на карточках товара, они добавлялись в корзину и отображались в ней. Для этого создадим переменную cart
const cart = ref([])

// 1.0 Разработка корзины товаров. И первое что нужно сделать — это её отображать. Вёрстка уже готова и осталось подключить к ней функционал. Для начала нужно, чтобы по клике на закладку корзины появлялся компонент DrawerElement. Точнее он будет отображаться только в случае, если флажок drawerOpened в положении true, что будет означать, что корзина открыта. (Изначально она будет закрыта, т.е. в положении false)
const drawerOpened = ref(false)

// 3.0 Займёмся рендером добавленных в корзину товаров. ↓

// 1.2 Также создадим две функции, которые будут открывать и закрывать корзину товаров
const openDrawer = () => (drawerOpened.value = true)

const closeDrawer = () => (drawerOpened.value = false)

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

// 3.7 Сделаем ещё две функции для добавления и удаления из корзины
// [Переход в CartItemList]
const addToCart = item => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = item => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

// 2.1 Создадим функцию добавления товаров в корзину. В ней должна быть проверка, что в корзине пока ещё нет товара, который мы хотим добавить
// 3.8 А здесь тогда переименуем функцию в onClickAddPlus и вставим в неё теперь новосозданные выше функции
// [Переход в CardList]
const onClickAddPlus = item =>
  !item.isAdded ? addToCart(item) : removeFromCart(item)

const onChangeSelect = evt => (filters.sortBy = evt.target.value)

const onChangeSearchInput = evt => (filters.searchQuery = evt.target.value)

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      'https://c3357c2bd0a9e3f6.mokky.dev/favorites',
    )

    goods.value = goods.value.map(item => {
      const favorite = favorites.find(
        favorite => favorite.productId === item.id,
      )

      if (!favorite) return item

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const addToFavorite = async item => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = {
        productId: item.id,
      }
      const { data } = await axios.post(
        'https://c3357c2bd0a9e3f6.mokky.dev/favorites',
        obj,
      )
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(
        `https://c3357c2bd0a9e3f6.mokky.dev/favorites/${item.favoriteId}`,
      )
      item.favoriteId = null
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) params.title = '*' + filters.searchQuery + '*'

    const { data } = await axios.get(
      'https://c3357c2bd0a9e3f6.mokky.dev/goods',
      { params },
    )
    goods.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)

// 1.3 Т.к. у нас есть стрелочка закрытия корзины внутри неё, то нам нужно прокинуть функцию закрытия корзины товаров в дочерний компонент DrawerHeader дочернего компонента DrawerElement, а это уже кейс для props drilling, и тут вполне логично будет использовать метод, использующий provide & inject. Создадим некий объединяющий обе функции открытия и закрытия корзины "cart". Теперь у нас будут две глобальные переменные с вышеозначенными функциями, которые можно использовать в любом дочернем компоненте App.
// 3.1 Поместим также и в provide содержимое корзины cart.
// [Переход в CartItemList]
// 3.6 У нас уже есть функция addToCart, которая добавляет товар в корзину. Добавим её также в provide, чтобы потом прокинуть в компонент CartItemList. ↑
provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <!-- 1.1 С помощью директивы "v-if" опишем, что компонент корзины товаров должен отображаться только в случае, если флажок drawerOpened в положении true -->
  <DrawerElement v-if="drawerOpened" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <!-- 1.4 В хедер мы можем прокинуть функцию через пропсы -->
    <!-- [Переход в HeaderItem] -->
    <HeaderItem @open-drawer="openDrawer" />
    <div class="p-10">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex gap-3">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none"
          >
            <option value="title">По названию</option>
            <option value="price">По цене (дешёвые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img
              class="absolute top-3 left-3.5"
              src="/img/search.svg"
              alt="Иконка поиска"
            />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-10 pr-2"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <!-- 2.2 Мы добавим функцию add-to-cart здесь -->
      <!-- [Переход в CardList] -->
      <!-- 3.9 Здесь поменяем функцию c addToCart на onClickAddPlus -->
      <!-- [Переход в CartItemList] -->
      <CardList
        :goods="goods"
        @add-to-favorite="addToFavorite"
        @add-to-cart="onClickAddPlus"
      />
    </div>
  </div>
</template>
