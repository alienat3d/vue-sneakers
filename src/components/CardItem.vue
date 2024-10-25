<script setup>
// 1.15 Также вытащим id в пропсах
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
})
</script>

<template>
  <div>
    <div
      class="relative flex flex-col min-h-[425px] bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        class="absolute top-8 left-8"
        alt="Иконка кнопки лайкнуть"
        :src="isFavorite ? '/img/liked.svg' : '/img/unliked.svg'"
        @click="onClickFavorite"
      />
      <img :src="imageUrl" alt="Мужские зелёные кроссовки Nike" />
      <p class="mt-2 capitalize">{{ title }}</p>

      <div class="flex justify-between mt-auto">
        <div class="flex flex-col">
          <span class="text-slate-400 uppercase">Цена:</span>
          <strong>{{ price }} руб.</strong>
        </div>
        <img
          @click="onClickAdd"
          :src="isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'"
          alt="Иконка кнопки плюс"
        />
      </div>
    </div>
  </div>
</template>
