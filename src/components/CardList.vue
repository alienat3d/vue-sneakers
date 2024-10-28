<script setup>
import CardItem from './CardItem.vue'

defineProps({
  goods: Array,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
<template>
  <!-- 2.1 Также и сюда подключим директиву анимации -->
  <div v-auto-animate class="grid grid-cols-4 gap-5 mt-10">
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
