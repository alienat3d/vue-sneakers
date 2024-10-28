<script setup>
import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
// 3.3 Здесь добавим emit с функцией отправки корзины на сервер
const emit = defineEmits(['createOrder'])

// 2.2 Добавим defineProps
// 4.3 Добавим также isCreatingOrder в пропсы ↓
// [Переход в App]
defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isCreatingOrder: Boolean,
  buttonDisabled: Boolean,
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>
  <div class="flex flex-col bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">
    <DrawerHeader />
    <CartItemList />

    <div class="mt-auto">
      <div class="flex items-center gap-2.5">
        <span>Налог 20%:</span>
        <span class="flex-1 border-b border-dashed"></span>
        <strong>{{ vatPrice }} руб.</strong>
      </div>
      <div class="mt-2 flex items-center gap-2.5">
        <span>Итого:</span>
        <span class="flex-1 border-b border-dashed"></span>
        <strong>{{ totalPrice }} руб.</strong>
      </div>
      <!-- 3.4 Сюда передаём эту функцию и также пропишем, что эта кнопка должна становится активной только, когда у нас есть значение в totalPrice, т.е. хоть один товар в корзине. -->
      <!-- 4.5 Передаём её кнопке -->
      <button
        :disabled="buttonDisabled"
        class="mt-6 bg-lime-500 w-full rounded-xl py-3 text-white font-bold transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-gray-400"
        @click="() => emit('createOrder')"
      >
        {{ totalPrice ? 'Оформить заказ' : 'Корзина пуста' }}
      </button>
    </div>
  </div>
</template>
