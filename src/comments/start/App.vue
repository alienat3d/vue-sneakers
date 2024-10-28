<script setup>
import Counter from './components/CounterItem.vue'
import CounterCompositionAPI from './components/CounterCompositionAPI.vue'
import Product from './components/ProductItem.vue'
</script>

<template>
  <Counter />
  <CounterCompositionAPI />
  <!-- Чтобы пропсы прокидывались именно тем типом данных, что мы указываем внутри компонента нам нужно ставить ":" перед их названием. Иначе они будут передаваться строчкой -->
  <!-- Также пропс с булевым значением можно записывать короче. -->
  <!-- Есть мнение, что во Vue пропсы лучше писать kebab-case, но это не столь принципиально -->
  <Product title="Кроссовки Puma" :price="9500 + 500" is-added>
    <button>Добавить</button>
  </Product>
  <Product title="Кеды Converse" :price="8500" :is-added="true" />
  <Product title="Кроссовки Reebok" :price="10000 * 0.7" isAdded />
  <Product title="Кроссовки Nike" price="7500 + 500" :isAdded="true" />
</template>
