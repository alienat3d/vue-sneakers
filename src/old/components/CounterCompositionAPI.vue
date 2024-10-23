<!-- Тот же самый счётчик ( Counter.vue ), но уже написанный на новом Composition API -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

/* function increment() {
  count++
} */
const increment = () => {
  count.value++
}
/* const updateCount = evt => {
  count.value = Number(evt.target.value)
} */
</script>

<template>
  <div class="count">{{ count }}</div>
  <button @click="increment" type="button">+</button>
  <!-- <button @click="count++" type="button">+</button> -->

  <!-- <input v-on:input="updateCount" type="text" /> -->
  <!-- <input @input="updateCount" type="text" /> -->
  <!-- Аналогично функции выше "updateCount" мы можем также использовать "v-model" для более короткой записи. С помощью "v-model" мы создаём связь между инпутом и реактивной переменной "count" мы и передаём в неё данные и также получаем из неё -->
  <input v-model="count" @keyup.ctrl.up="increment" />
</template>

<!-- <style>
body {
  background: #333;
}
</style> -->
<style scoped>
.count {
  width: 24px;
  text-align: center;
  color: aliceblue;
}
</style>
