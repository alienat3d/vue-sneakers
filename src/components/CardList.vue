<script setup>
import CardItem from './CardItem.vue'

defineProps({
  goods: Array,
})
</script>

<template>
  <div class="grid grid-cols-4 gap-5 mt-10">
    <CardItem
      v-for="item in goods"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onclickFavorite="onclickFavorite"
      :onclickAdd="onclickAdd"
    />
  </div>
</template>
