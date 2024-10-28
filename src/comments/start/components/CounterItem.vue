<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count++
    },
  },
}
</script>

<template>
  <div class="count">{{ count }}</div>
  <button @click="increment" type="button">+</button>
  <!-- <button @click="count++" type="button">+</button> -->
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
