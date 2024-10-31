<!-- 1.0 Теперь поработаем с избранным. В принципе структура будет похожа на ту, что мы имеем на главной, но только отображаться будут лишь те товары, что мы отметили добавлением в избранное нажав на кнопку сердечка. -->
<!-- 1.1 Но сперва установим Vue Router для мгновенных переходов, как описано на странице: https://router.vuejs.org/installation.html -->
<!-- 1.2 В структуре файлов в ./src/ создадим папку "pages", где будут храниться страницы. Главная страница будет HomeView.vue -->
<script setup>
import { ref, provide, watch, computed } from 'vue'
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import DrawerComp from './components/DrawerComp.vue'

/* Корзина */
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

const addToCart = item => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = item => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

// 1.6 Функции, которые используются в разных компонентах, как createOrder оставим на верхнем уровне.
// [Переход в HomeView]
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
/* / Корзина */
</script>

<template>
  <DrawerComp
    v-if="drawerOpened"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :button-disabled="cartButtonDisabled"
    @create-order="createOrder"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <HeaderItem :total-price="totalPrice" @open-drawer="openDrawer" />
    <!-- 1.3 Далее мы вырезаем всю вёрстку, которая относится к главной странице и переносим её в HomeView.vue -->
    <!-- 1.4 А теперь переносим всю необходимую для этой страницы логику в компонент HomeView.vue -->
    <!-- 1.8 Здесь мы будем отображать сам HomeView. Для этого добавим "router-view", который даст понять приложению, что здесь будут рендериться все компоненты страниц. -->
    <!-- [Переход в main.js] -->
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
