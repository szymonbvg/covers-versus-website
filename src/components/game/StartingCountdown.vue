<template>
  <div class="overlay">
    <span v-if="countdown > 0">{{ countdown }}</span>
    <Loading v-else />
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { GameState } from "@/types/game";
import { MessageType } from "@/types/websocket";
import { ref, watch } from "vue";
import Loading from "../ui/Loading.vue";

const gameSession = useGameSession();

const COUNTDOWN_INITIAL_VALUE = 3;
const countdown = ref(COUNTDOWN_INITIAL_VALUE);

watch(
  () => gameSession.data.gameState,
  (gameState, _, onCleanup) => {
    if (gameState !== GameState.STARTING) return;

    countdown.value = COUNTDOWN_INITIAL_VALUE;
    const interval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(interval);
        gameSession.send({ type: MessageType.PLAYER_READY });
      }
    }, 1000);

    onCleanup(() => clearInterval(interval));
  },
  { immediate: true }
);
</script>

<style scoped>
.overlay {
  z-index: 97;
}

span {
  font-weight: bold;
  font-size: 100px;
}

.loading {
  height: 30%;
  max-height: 200px;
}
</style>
