<!-- 1.7 Теперь у нас есть отдельный компонент с вёрсткой и логикой главной страницы. -->
<!-- [Переход в App] -->
<script setup>
import { inject, reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const goods = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onClickAddPlus = item =>
  !item.isAdded ? addToCart(item) : removeFromCart(item)

const onChangeSelect = evt => (filters.sortBy = evt.target.value)

const onChangeSearchInput = evt => (filters.searchQuery = evt.target.value)

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

watch(cart, () => {
  goods.value = goods.value.map(item => ({ ...item, isAdded: false }))
  // closeDrawer()
})

watch(filters, fetchItems)
</script>

<template>
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
</template>
