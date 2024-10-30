<script setup>
import DrawerHeader from './DrawerHeader.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const emit = defineEmits(['createOrder'])

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
    <InfoBlock
      v-if="!totalPrice"
      img-url="/img/empty-cart.jpg"
      title="Корзина пустая"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
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
