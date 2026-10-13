<template>
  <div class="username-card">
    <p>{{ store.username ?? "..." }}</p>
    <button @click="store.username = null">Change Username</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";

const store = useStore();
</script>

<style scoped>
.username-card {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.username-card p {
  font-weight: bold;
  font-size: 22px;
}

.username-card button {
  min-height: 50px;
}
</style>
