<script setup>
import { ref, provide, watch, computed } from 'vue'

import HeaderItem from './components/HeaderItem.vue'
import DrawerComp from './components/DrawerComp.vue'

const cart = ref([])

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
