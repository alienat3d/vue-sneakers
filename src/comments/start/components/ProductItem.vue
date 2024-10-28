<!-- Теперь сделаем универсальный компонент, куда прокинем данные из-вне.
Бывают ситуации, когда нужно из родителя, например App.vue, прокинуть данные в компонент, чтобы их отобразить. Для этого используется спец. функция defineProps. Она будет внутри себя описывать какие пропсы мы ожидаем получить в компонент. А также там определяются типы получаемых данных. Ну и затем в фигурных скобках указываем эти пропсы в template. -->

<!-- Cлоты: Если нам требуется вставить какой-то элемент внутрь компонента, скажем какую-то доп. кнопку, то мы можем использовать <slot></slot>. Также можно и вставлять компонент в компонент. -->
<script setup>
defineProps({
  title: String,
  price: Number,
  isAdded: Boolean,
})
// Также можно прокинуть пропсы в переменную:
/* const props = defineProps({
  title: String,
  price: Number,
  isAdded: Boolean,
})
console.log(props) */
</script>

<template>
  <div class="product">
    <h2>Товар: {{ title }}</h2>
    <h3>Цена: {{ price }} ₽</h3>
    <h4>Добавлен: {{ isAdded }}</h4>
    <slot></slot>
  </div>
</template>

<style scoped>
.product {
  margin: 10px 0;
  border: 1px solid blue;
  border-radius: 20px;
  padding: 10px 30px;
  background-color: #999;
}
</style>
