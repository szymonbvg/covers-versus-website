<template>
  <div class="overlay">
    <div class="error">
      <GameError />
      <button @click="handleClick">Go to home page</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import GameError from "./GameError.vue";

const handleClick = async () => {
  await router.replace("/");
};
</script>

<style scoped>
.overlay {
  z-index: 98;
}

.error {
  display: flex;
  flex-direction: column;
  background-color: #43403e;
  width: 70vw;
  max-width: 550px;
  height: 60vh;
  max-height: 290px;
  border-radius: 8px;
  box-shadow: 10px 10px #1b1a18;
  padding: 15px;
  box-sizing: border-box;
}

button {
  height: 40%;
}

.error span {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
}
</style>
