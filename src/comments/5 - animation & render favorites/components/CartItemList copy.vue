<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <!-- 2.0 Теперь добавим анимацию из библиотеки "auto-animate", для этого перейдём на сайт библиотеки, устанавливаем и настраиваем: https://auto-animate.formkit.com/#usage-vue, а далее просто добавим к блоку директиву v-auto-animate и вуоля, у нас есть анимация. Важно не на компонент его вешать, а на HTML-элемент, как здесь. -->
  <!-- [Переход в main.js] -->
  <div v-auto-animate class="flex flex-col mb-auto gap-4">
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
