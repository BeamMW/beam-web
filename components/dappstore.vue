<template>
  <div class="grid-container">
    <div v-for="(item, index) in items" :key="index" class="grid-item">
      <img :src="item.image" :alt="item.name" class="item-image" />
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-category">{{ item.category }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 16px;
  padding: 16px;
}

.grid-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 8px;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.item-category {
  font-size: 14px;
  color: #666;
}
</style>
