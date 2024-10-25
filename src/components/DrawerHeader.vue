<script setup>
import { inject } from 'vue'

// 1.7.0 А здесь мы уже применим глобальную функцию закрытия корзины через inject. А точнее с помощью деструктуризации вытащим closeDrawer из cartActions
const { closeDrawer } = inject('cartActions')
</script>
<template>
  <div class="flex items-center gap-5 mb-8">
    <!-- 1.7.1 Ну и стрелочке передадим функционал закрытия корзины товаров -->
    <svg
      class="opacity-30 rotate-180 cursor-pointer transition hover:opacity-100 hover:-translate-x-1"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="closeDrawer"
    >
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <h2 class="text-2xl font-bold">Корзина</h2>
  </div>
</template>
