<script setup>
// 1.0 Займёмся рендерингом странички избранных товаров. Для начала нам понадобятся здесь axios & onMounted, т.к. при переходе нам нужен запрос на сервер для отображения списка товаров, добавленных в избранное.
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

// 1.1 Здесь будет храниться список избранных товаров
const favorites = ref([])

// 1.2 А здесь мы укажем, что при первом посещении странички мы делаем запрос на сервер
// 1.3.0 Итак, нам нужно решить одну проблему, чтобы в избранном получались не только id & productId, но и информация о каждом товаре из массива goods. Её можно решить как минимум тремя вариантами (использовать мы будем 2-ой вариант):
// 1.3.1 1) Это получение всего массива goods и сравнивая id его внутренних объектов с теми, что у нас в массиве favorites, отсортировать лишь нужные. Но так в реальных проектах вряд ли кто-то станет делать, это слишком уж топорный способ, хоть и самый простой.
// 1.3.2 2) Используя возможности Mokky API, а именно "связь двух ресурсов" (см. доку), связать два массива друг с другом, т.о. в favorites по id продукта будут получаться и другая информация о нём.
// 1.3.3 3) При добавлении товара в избранное передавать также сам объект item со всей информацией о товаре [Переход в HomeView].
onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://c3357c2bd0a9e3f6.mokky.dev/favorites?_relations=goods',
      // 'https://c3357c2bd0a9e3f6.mokky.dev/favorites',
    )
    // 1.4 Добавляем в favorites полученные из Mokky API данные
    // 1.6 А ещё, для корректного отображения, т.к. у нас, в отличии от объектов массива goods, теперь есть вложенный объект items, данные из которого нам нужно вытянуть, то приводим его с помощью метода map к похожему на goods виду.
    console.log(data)

    favorites.value = data.map(obj => obj.good)
  } catch (error) {
    console.error(error)
  }
})
</script>
<template>
  <h1 class="text-3xl font-bold">Мои избранные товары</h1>
  <!-- 1.5 Ну, а здесь рендерим избранные товары, для этого нам нужно взять из HomeView.vue компонент CardList. Однако передавать в него мы будем favorites. -->
  <CardList
    :goods="favorites"
    @add-to-favorite="addToFavorite"
    @add-to-cart="onClickAddPlus"
  />
</template>
