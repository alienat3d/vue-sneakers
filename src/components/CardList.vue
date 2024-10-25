<script setup>
// 1.10 Тут нам уже понадобится метод Vue inject.
// ? Тут Стоит отдельно отметить, что когда только один уровень прокидывания, то inject юзать несколько странно и лучше прокинуть через пропсы, а inject использовать только для глубокого прокидывания вглубь. Т.ч. тут это было скорее для примера, чтобы понимать как это работает.
// 2.0 Однако, теперь мы всё же сделаем прокидывание через пропсы*, для этого сперва закомментируем то, что делали ранее.
// *Точнее через emits, потому, что мы имеем дело с событиями, т.е. "прокидывание событий" (https://vuejs.org/guide/components/events)
// 2.1 [переход в App]
// import { inject } from 'vue'

import CardItem from './CardItem.vue'

defineProps({
  goods: Array,
  isFavorites: Boolean,
})

// 2.4 В defineEmits мы пропишем какие функции мы вытаскиваем из списка событий
const emit = defineEmits(['addToFavorite'])

// 2.5 Теперь мы используем функцию для событий emit, куда первым аргументом пишем название функции события, а вторым аргументы, которые в неё передаются.
/* const function = () => {
  emit('addToFavorite', item)
} */

// 1.11 А теперь вытаскиваем функцию addToFavorites с помощью inject. Так мы можем объявить через provide сколько угодно значений, функций и т.д., а затем использовать их при помощи inject в дочерних компонентах, указывая их ключ. Ключи естественно, должны быть все разными.
// const addToFavorite = inject('addToFavorites')

// 1.12 Создадим функцию onClickFavorite, которая создаст объект,который будет хранить в себе id товара.
// 1.16 Теперь мы опишем, что у объекта есть свойство productId, но здесь уже нам нужно поместить defineProps в переменную, иначе в скрипте пропс id взять не получится. ↓
/* const onClickFavorite = () => {
  const obj = {
    ...props,
    productId: props.id,
  }

  addToFavorite(obj)
} */
</script>
<!-- 1.5 Добавляем :isFavorite -->
<!-- [ Переходим в App] -->
<!-- 1.14 Добавим ещё id товара -->
<!-- [ Переходим в CardItem] -->
<!-- 1.17 Поместим функцию onClickFavorite в атрибуты компонента, в которую поместим объект item. Эта функция получит реактивный объект item и изменит его свойство isFavorite на true -->
<!-- 2.6 Меняем атрибут компонента с ":onClickFavorite="() => addToFavorite(item) на :onClickFavorite="() => emit('addToFavorite', item) -->
<!-- [ Переходим в App] -->
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
