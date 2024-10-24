<script setup>
import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerElement from './components/DrawerElement.vue'
</script>

<template>
  <!-- <DrawerElement /> -->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <HeaderItem />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold mb-8">Все кроссовки</h1>
        <div class="flex gap-3">
          <select class="py-2 px-3 border rounded-md outline-none">
            <option>По названию</option>
            <option>По цене (дешёвые)</option>
            <option>По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img
              class="absolute top-2 left-3.5"
              src="/img/search.svg"
              alt="Иконка поиска"
            />
            <input
              class="border rounded-md py-2 pl-10 pr-2"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <CardList />
    </div>
  </div>
</template>
