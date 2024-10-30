<script setup>
import { onMounted, ref, reactive, provide, watch } from 'vue'
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
// import DrawerComp from './components/DrawerComp.vue'

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

// 1.0 Делаем запрос на сервер, чтобы получить все товары, отмеченные избранными

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      'https://c3357c2bd0a9e3f6.mokky.dev/favorites',
    )
    // 1.1 Пробегаемся методами map & find по массиву favorites и проверяем есть ли там какие-то объекты, которые также есть в общем массиве, сравнивая их по id. Т.е. что они есть в избранном. А если объекта в избранном не оказалось, то мы его никак менять не будет, а просто вернём. (В базе данных у нас будет храниться также productId, указывающий на id товара, которому принадлежит эта закладка)
    goods.value = goods.value.map(item => {
      const favorite = favorites.find(
        favorite => favorite.productId === item.id,
      )

      if (!favorite) {
        return item
      }
      // 1.2 Но если выяснилось, что в избранном что-то есть, то мы вернём новый объект, в котором есть все его прежние свойства, а также новое свойство isFavorite в значении true. Также сохраняем, полученное с backend'а, id закладки в favoriteId, чтобы потом мочь по нему удалять эту закладку.
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (error) {
    console.error(error)
  }
}
// 1.4 [ Переходим в CardList]
// 1.6 Создаём функцию добавления в избранное. Теперь, когда мы захотим сделать какой-то товар избранным, мы должны поменять ему свойство isFavorite на true, что и будет делать данная функция.
// 1.7 Теперь нам нужно сюда прокинуть из App функцию addToFavorites() и вытащить в пропсы. Потом взять из пропсов и прокинуть в CardItem. Но есть во Vue более элегантный способ, когда нам нужно что-то прокинуть из пропса в пропс несколько раз и называется это Prop Drilling (https://vuejs.org/guide/components/provide-inject). ↓
// 2.7.0 Теперь нам также нужно, чтобы по клику на иконку сердца изменения происходили не только в UI, но и отправлялись на сервер, внося изменения в базу данных, т.е. чтобы изменения сохранялись.
// 2.7.1 Итак, если у кликнутого элемента ещё не было флажка isFavorite, то отправим запрос на сервер и создадим новый объект для него в favorites методом POST, а если есть, то удалим его оттуда методом DELETE.
// 2.7.2 Для записи мы создадим объект obj и передадим в productId его id. И этот объект мы передадим в запрос axios вторым аргументом.
const addToFavorite = async item => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = {
        productId: item.id,
      }
      const { data } = await axios.post(
        'https://c3357c2bd0a9e3f6.mokky.dev/favorites',
        obj,
      )
      // 2.7.3 Также сохраним и id закладки в объект товара, чтобы потом можно было по нему эту закладку удалять
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(
        `https://c3357c2bd0a9e3f6.mokky.dev/favorites/${item.favoriteId}`,
      )
      item.favoriteId = null
    }
  } catch (error) {
    console.error(error)
  }
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
    // 1.3 Прописываем каждому из объектов свойства isFavorite & isAdded в положение false, даже если они на самом деле true.
    goods.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

// 1.8 Итак, мы объявим, что у нас есть функция addToFavorites. Т.е. мы объявляем глобальную функцию для всех дочерних компонентов App, которые все будут иметь к ней доступ. Но важно помнить, что это относится только именно к дочерним элементам, которые находятся в <template> у того компонента, где мы это объявили.
// 1.9 [переход в CardItem]
provide('addToFavorite', addToFavorite)

watch(filters, fetchItems)
</script>

<template>
  <!-- <DrawerComp /> -->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-12">
    <HeaderItem />

    <div class="p-10">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
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
              class="absolute top-3 left-3.5"
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
      <!-- 2.2 Прокидываем событие и функцию addToFavorite -->
      <!-- 2.3 [Переход в CardList] -->
      <CardList :goods="goods" @addToFavorite="addToFavorite" />
    </div>
  </div>
</template>
