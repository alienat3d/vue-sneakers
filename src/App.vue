<script setup>
import { onMounted, ref, reactive, provide, watch, computed } from 'vue'
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerElement from './components/DrawerElement.vue'

const goods = ref([])
const cart = ref([])

const isCreatingOrder = ref(false)

const drawerOpened = ref(false)

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0),
)

const vatPrice = computed(() => Math.round((totalPrice.value * 20) / 100))

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(
  () => isCreatingOrder.value || cartIsEmpty.value,
)

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

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(
      'https://c3357c2bd0a9e3f6.mokky.dev/orders',
      { goods: cart.value, totalPrice: totalPrice.value },
    )

    cart.value = []

    return data
  } catch (error) {
    console.error(error)
  } finally {
    isCreatingOrder.value = false
  }
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
// 1.1 Далее мы укажем, чтобы при загрузке страницы проверяем localStorage на наличие записи "cart" и если есть, то трансформируем её из строки в массив, а если нет, то вернётся пустой массив.
onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || []

  await fetchItems()
  await fetchFavorites()

  goods.value = goods.value.map(item => ({
    ...item,
    isAdded: cart.value.some(cartItem => cartItem.id === item.id),
  }))
})

watch(filters, fetchItems)

watch(cart, () => {
  goods.value = goods.value.map(item => ({ ...item, isAdded: false }))
  closeDrawer()
})

// 1.0 Реализуем сохранение товаров в корзине в localStorage. watch будет следить за содержимым корзины cart и при этом делать глубокую проверку.
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
})
</script>

<template>
  <DrawerElement
    v-if="drawerOpened"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :button-disabled="cartButtonDisabled"
    @create-order="createOrder"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
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
