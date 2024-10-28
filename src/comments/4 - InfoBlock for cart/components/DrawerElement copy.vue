<!-- 1.1 Добавим компонент с динамически меняющейся информацией InfoBlock -->
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
    <!-- 1.2 Добавим ему контента -->
    <!-- 1.5 А в блоке InfoBlock наоборот пропишем, что он должен появляться только только тогда, когда корзина пуста. -->
    <InfoBlock
      v-if="!totalPrice"
      img-url="/img/empty-cart.jpg"
      title="Корзина пустая"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
    />
    <!-- 1.6 Кстати, вместо двух директив "v-if" мы можем обернуть CartItemList и блок с ценой и налогом в доп. div и дать ему директиву "v-else", но это так, на всякий случай. -->
    <!-- <div v-else> -->
    <!-- 1.4 Тоже самое пропишем и в списке товаров -->
    <CartItemList v-if="totalPrice" />
    <!-- 1.3 Пропишем, что этот блок с ценой и налогом должен появляться только тогда, когда в корзине что-то есть, т.е. totalPrice > 0. -->
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
