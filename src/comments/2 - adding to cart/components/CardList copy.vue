<script setup>
import CardItem from './CardItem.vue'

defineProps({
  goods: Array,
})
// 2.3 Вытаскиваем здесь функцию addToCart и добавляем её в CardItem
// 2.4 Также передаём свойство isAdded
// [Переход в App]
const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5 mt-10">
    <CardItem
      v-for="item in goods"
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
