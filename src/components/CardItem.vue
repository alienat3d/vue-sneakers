<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onclickFavorite: Function,
  onclickAdd: Function,
})
</script>

<template>
  <div>
    <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        class="absolute top-8 left-8"
        :src="isFavorite ? '/img/liked.svg' : '/img/unliked.svg'"
        alt="Иконка кнопки лайкнуть"
      />
      <img
        @click="onclickFavorite"
        :src="imageUrl"
        alt="Мужские зелёные кроссовки Nike"
      />
      <p class="mt-2">{{ title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400 uppercase">Цена:</span>
          <strong>{{ price }} руб.</strong>
        </div>
        <img
          @click="onclickAdd"
          :src="isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'"
          alt="Иконка кнопки плюс"
        />
      </div>
    </div>
  </div>
</template>
