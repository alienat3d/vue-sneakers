<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://c3357c2bd0a9e3f6.mokky.dev/favorites?_relations=goods',
    )

    favorites.value = data.map(obj => obj.good)
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <h1 class="text-3xl font-bold">Мои избранные товары</h1>
  <CardList
    :goods="favorites"
    @add-to-favorite="addToFavorite"
    @add-to-cart="onClickAddPlus"
  />
</template>
