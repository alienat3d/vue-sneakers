<script setup>
import CardItem from './CardItem.vue'

defineProps({
  goods: Array,
})

const emit = defineEmits(['addToFavorite'])
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
      :isFavorite="item.isFavorite"
    />
  </div>
</template>
