<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerElement from './components/DrawerElement.vue'

const goods = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeSelect = evt => {
  filters.sortBy = evt.target.value
}

const onChangeSearchInput = evt => {
  filters.searchQuery = evt.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(
      'https://c3357c2bd0a9e3f6.mokky.dev/goods',
      { params },
    )
    goods.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchItems)

watch(filters, fetchItems)
</script>

<template>
  <!-- <DrawerElement /> -->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <HeaderItem />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold mb-8">Все кроссовки</h1>
        <div class="flex gap-3">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none"
          >
            <option value="title">По названию</option>
            <option value="price">По цене (дешёвые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img
              class="absolute top-2 left-3.5"
              src="/img/search.svg"
              alt="Иконка поиска"
            />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-10 pr-2"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>

      <CardList :goods="goods" />
    </div>
  </div>
</template>
