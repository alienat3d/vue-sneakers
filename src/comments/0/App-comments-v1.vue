<script setup>
// Чтобы рендерить карточки товаров при первом запуске страницы нужен хук onMounted
import { onMounted, ref, reactive, watch } from 'vue'
// А с помощью библиотеки axios получаем данные с API
import axios from 'axios'

import HeaderItem from './components/HeaderItem.vue'
import CardList from './components/CardList.vue'
import DrawerComp from './components/DrawerComp.vue'

// Чтобы отрендерить данные в веб-приложении нам понадобится реактивное состояние в компоненте, а точнее ref
const goods = ref([])

// Фильтры и поиск
// Чтобы не дублировать код для поиска сделаем лучше одну переменную filters
/* const sortBy = ref('')
const searchQuery = ref('') */

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

/* const onChangeSelect = evt => {
  sortBy.value = evt.target.value
} */
// Теперь и функцию следует немного изменить
const onChangeSelect = evt => {
  filters.sortBy = evt.target.value
}

// Функция, отлавливающая значение, введённое в строку поиска
const onChangeSearchInput = evt => {
  filters.searchQuery = evt.target.value
}

/* onMounted(() => {
  axios
    .get('https://c3357c2bd0a9e3f6.mokky.dev/goods')
    .then(resp => console.log(resp.data))
}) */
// Или можно записать тоже самое в конструкции async await:
// Позволяет определить что поменялось и, исходя из этого, применять ту или иную функцию. Здесь он следит за изменением переменной sortBy в которую отправляются разные value из options, при выборе select пользователем, после чего сортирует и рендерит заново, учитывая тот или иной фильтр.
// Если нужно следить за изменениями конкретных свойств, то запишем так: () => filters.sortBy
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      // searchQuery: filters.searchQuery,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    /* `https://c3357c2bd0a9e3f6.mokky.dev/goods?title=*${filters.searchQuery}*&sortBy=${filters.sortBy}`,
      В axios можно не так писать так громоздко, а вместо этого: */
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
  <!-- <DrawerComp /> -->
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
