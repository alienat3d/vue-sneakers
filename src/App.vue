<script setup>
import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerElement from './components/DrawerElement.vue'
</script>

<template>
  <DrawerElement />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <HeaderItem />

    <div class="p-10">
      <h1 class="text-3xl font-bold mb-8">Все кроссовки</h1>

      <CardList />
    </div>
  </div>
</template>
