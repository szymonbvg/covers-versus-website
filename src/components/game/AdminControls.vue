<template>
  <div class="admin-controls">
    <button :disabled="startClicked" @click="startGame">Start Game</button>
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { MessageType } from "@/types/websocket";
import { ref } from "vue";

const gameSession = useGameSession();

const startClicked = ref(false);

const startGame = () => {
  if (!gameSession.data.hasAdminAccess || startClicked.value) return;

  startClicked.value = true;
  gameSession.send({ type: MessageType.START_GAME });
};
</script>

<style scoped>
.admin-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  height: 50px;
  width: 240px;
}
</style>
