<!-- 1.0 Создадим универсальный компонент, который будет отображать какую-то информацию, например, что корзина пуста или заказ отправлен или что избранных товаров пока нет и т.д. -->
<!-- [Переход в DrawerItem] -->
<script setup>
defineProps({
  imgUrl: String,
  title: String,
  description: String,
})
</script>
<template>
  <div class="text-center w-72 m-auto">
    <img class="mx-auto" width="120" height="120" :src="imgUrl" :alt="title" />
    <h2 class="mt-4 text-2xl font-medium mb-2">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
