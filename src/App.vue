<script setup>
import { onMounted, ref, reactive, provide, watch, computed } from 'vue'
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerElement from './components/DrawerElement.vue'

const goods = ref([])
const cart = ref([])

const drawerOpened = ref(false)

// 1.3 Напишем функцию, которая будет считать общую сумму цен товаров в корзине ↓
// const totalPrice = cart.value.reduce((acc, item) => acc + item.price, 0)
// 1.5 Но мало просто так написать эту функцию, т.к. её значение будет не реактивно, т.е. оно только один раз посчитается в самом начале и вернёт 0. Чтобы оно следило за изменениями и пересчитывалось есть специальная функция computed. Таким образом мы можем что-то делать с реактивными изменяемыми переменными и использовать каждое их новое значение в функции через computed.
const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0),
)

// 2.1 Создадим функцию, которая будет вычислять налог от суммы цен в корзине
// [Переход в DrawerElement]
const vatPrice = computed(() => Math.round((totalPrice.value * 20) / 100))

const openDrawer = () => (drawerOpened.value = true)

const closeDrawer = () => (drawerOpened.value = false)

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const addToCart = item => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = item => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

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

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <!-- 2.0 Теперь нам нужно сделать, чтобы и в панели корзины считалась общая сумма товаров и налог от неё. Поэтому и сюда мы передаём total-price, а также vat для налога. ↑ -->
  <DrawerElement
    v-if="drawerOpened"
    :total-price="totalPrice"
    :vat-price="vatPrice"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <!-- 1.0 Теперь необходимо сделать так, чтобы и общая цена товаров, добавленных в корзину, отображалась в хедере. Для этого мы прокинем в HeaderItem пропс, который будет хранить число общей цены — total-price. -->
    <!-- [Переход в HeaderItem] -->
    <!-- 1.4 А теперь вставим эту функцию во вкладку "Корзина" ↑ -->
    <HeaderItem :total-price="totalPrice" @open-drawer="openDrawer" />
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
      <CardList
        :goods="goods"
        @add-to-favorite="addToFavorite"
        @add-to-cart="onClickAddPlus"
      />
    </div>
  </div>
</template>
