<!-- 1.5 Вставляем функцию события по клику открывающую корзину товаров через defineEmits сюда в script -->
<script setup>
const emit = defineEmits(['openDrawer'])
</script>
<template>
  <header class="flex justify-between border-b border-gray-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img
        class="w-10"
        src="/img/logo.png"
        alt="Логотип интернет-магазина «Vue Sneakers»"
      />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-gray-400">Магазин лучших кроссовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <!-- 1.6 Далее встроим в закладку корзины функцию, которая будет её открывать -->
      <!-- [Переход в DrawerHeader] -->
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer transition hover:text-black"
        @click="() => emit('openDrawer')"
      >
        <img src="/img/cart.svg" alt="Иконка продуктовая тележка" />
        <b>1205 руб.</b>
      </li>
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer transition hover:text-black"
      >
        <img src="/img/heart.svg" alt="Иконка избранное" />
        <span>Избранное</span>
      </li>
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer transition hover:text-black"
      >
        <img src="/img/user.svg" alt="Иконка профиль" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
