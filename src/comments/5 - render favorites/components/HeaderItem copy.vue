<script setup>
defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
</script>
<template>
  <header class="flex justify-between border-b border-gray-200 px-10 py-8">
    <!-- 1.9.0 Теперь там, где нам нужны ссылки мы используем <RouterLink>. Здесь... -->
    <RouterLink to="/">
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
    </RouterLink>

    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-gray-500 cursor-pointer transition hover:text-black"
        @click="() => emit('openDrawer')"
      >
        <img src="/img/cart.svg" alt="Иконка продуктовая тележка" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <!-- 1.9.1 ...и здесь. -->
      <RouterLink to="/favorites">
        <li
          class="menu-item flex items-center gap-3 text-gray-500 cursor-pointer transition hover:text-black"
        >
          <img src="/img/heart.svg" alt="Иконка избранное" />
          <span>Избранное</span>
        </li>
      </RouterLink>
      <li
        class="menu-item flex items-center gap-3 text-gray-500 cursor-pointer transition hover:text-black"
      >
        <img src="/img/user.svg" alt="Иконка профиль" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.router-link-active .menu-item {
  font-weight: 700;
}
</style>
