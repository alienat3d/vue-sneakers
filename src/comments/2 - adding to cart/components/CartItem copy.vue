<script setup>
// 3.11 Добавим emit
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
})
</script>
<!-- 3.4 Теперь нужно отрендерить сами данные в компоненте элемента корзины. Поэтому добавляем всё необходимое в defineProps и затем вставляем в вёрстку для динамического заполнения. -->
<!-- [Переход в CartItemList] -->
<!-- 3.12 Добавим событие по клику для удаления товара из корзины -->
<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
    <img class="w-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col">
      <div class="flex justify-between mb-2">
        <p class="capitalize pr-3">{{ title }}</p>
        <img
          class="self-start opacity-50 transition hover:opacity-100 cursor-pointer"
          src="/img/btn-remove.svg"
          alt="Иконка удаления товара"
          @click="emit('onClickRemove')"
        />
      </div>
      <strong>{{ price }} руб.</strong>
    </div>
  </div>
</template>
