<script setup>
import { inject, ref, computed } from 'vue'
import axios from 'axios'

import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

// [Удалено за ненадобностью]
// const emit = defineEmits(['createOrder'])

// [Удалено за ненадобностью: isCreatingOrder: Boolean,  buttonDisabled: Boolean,
const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

// 1.2 Также нам понадобится взять корзину товаров
const { cart } = inject('cart')

// 1.5 Переименуем isCreatingOrder в более лаконичное isCreating
const isCreating = ref(false)
// 1.6 Теперь создадим ещё одно состояние orderId, которое будет хранить по умолчанию null
const orderId = ref(null)

// 1.7 И передадим это состояние в функцию createOrder. Теперь у нас будет забираться ID заказа c бэкенда и добавляться в корзину.
const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(
      'https://c3357c2bd0a9e3f6.mokky.dev/orders',
      { goods: cart.value, totalPrice: props.totalPrice.value },
    )

    cart.value = []

    orderId.value = data.id
  } catch (error) {
    console.error(error)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>
  <div class="flex flex-col bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">
    <DrawerHeader />
    <!-- 1.8 Тут мы проверяем, что если корзина товаров пуста (нет рассчитанной цены товаров), а также orderId == null, то выводится один инфоблок, а если orderId != null, т.е. заказ уже сделан, то выводится другой. -->
    <InfoBlock
      v-if="!totalPrice && !orderId"
      img-url="/img/empty-cart.jpg"
      title="Корзина пустая"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
    />
    <InfoBlock
      v-if="orderId"
      img-url="/img/complete-order.jpg"
      title="Заказ оформлен!"
      :description="`Ваш заказ №${orderId} уже собирается и скоро будет передан курьерской доставке.`"
    />
    <CartItemList v-if="totalPrice" />
    <div v-if="totalPrice" class="mt-auto">
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
      <!-- 1.3 Переименуем cartButtonDisabled в более лаконичное buttonDisabled, и добавим к кнопке -->
      <!-- 1.4 Также заменим и кнопку создания и отправки заказа с (@click="() => emit('createOrder')") на: @click="createOrder" -->
      <button
        :disabled="buttonDisabled"
        class="mt-6 bg-lime-500 w-full rounded-xl py-3 text-white font-bold transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-gray-400"
        @click="createOrder"
      >
        {{ totalPrice ? 'Оформить заказ' : 'Корзина пуста' }}
      </button>
    </div>
  </div>
</template>
