<script setup>
import CardItem from './CardItem.vue'

const onclickAdd = () => {
  this.isAdded = !this.isAdded
}
const onclickFavorite = () => {
  this.isFavorite = !this.isFavorite
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <CardItem
      imageUrl="/img/sneakers/1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="12999"
      :onclickFavorite="onclickFavorite"
      :onclickAdd="onclickAdd"
    />
    <CardItem />
    <CardItem />
    <CardItem />
    <CardItem />
    <CardItem />
  </div>
</template>
