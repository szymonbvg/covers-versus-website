<template>
  <span>{{ message }}</span>
</template>

<script setup lang="ts">
const { message } = defineProps<{ message: string }>();
</script>

<style scoped>
span {
  color: red;
  text-align: center;
  text-decoration: none !important;
}
</style>
