<script setup>
import { ref, provide, watch, computed } from 'vue'
// [Удалено за ненадобностью]
// import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import DrawerComp from './components/DrawerComp.vue'

/* Корзина */
const cart = ref([])

// 1.0 Создадим оповещение пользователя сообщением с его номером заказа, после того, как он нажмёт кнопку "Отправить заказ". У нас есть. У нас уже есть состояние isCreatingOrder, который указывает на то, что заказ создаётся и функция createOrder(), которая создаёт и отправляет новый заказ. ↓
// [Перенесено в DrawerComp]
// const isCreatingOrder = ref(false)

const drawerOpened = ref(false)

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0),
)

const vatPrice = computed(() => Math.round((totalPrice.value * 20) / 100))

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

// 1.1 Вообще говоря, эту функцию лучше бы вынести в DrawerComp. Т.к. она относится именно к корзине товаров. Как в прочем и вышеозначенный isCreatingOrder.
// [Переход в DrawerComp]
// [Перенесено в DrawerComp]
/* const createOrder = async () => {
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
} */

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
  <!-- [ Удалены из компонента DrawerComp
  :button-disabled="cartButtonDisabled"
  @create-order="createOrder" ] -->
  <DrawerComp
    v-if="drawerOpened"
    :total-price="totalPrice"
    :vat-price="vatPrice"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <HeaderItem :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
