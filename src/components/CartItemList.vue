<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
// 3.2 Здесь вытаскиваем структуризацией содержимое cart
// 3.8 Здесь вытаскиваем также и функцию addToCart
const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <div class="flex flex-col mb-auto gap-4">
    <!-- 3.3 Сделаем рендер списка с помощью v-for. Также укажем ключ. -->
    <!-- [Переход в CartItem] -->
    <!-- 3.5 Допишем title и price -->
    <!-- [Переход в App] -->
    <!-- 3.10 Добавим функцию удаления товара из корзины removeFromCart -->
    <!-- [Переход в CartItem] -->
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
