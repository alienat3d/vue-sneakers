<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
})
</script>
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
