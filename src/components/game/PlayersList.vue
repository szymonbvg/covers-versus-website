<template>
  <div class="players-container">
    <h1>{{ gameSession.data.players.length }} / {{ settings.maxPlayers }}</h1>
    <div class="players-list">
      <div class="chip-list">
        <div v-for="player in gameSession.data.players" class="chip-container">
          <div class="chip" :class="{ you: player === store.username }">
            <span>{{ player === store.username ? `> ${player} <` : player }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { useStore } from "@/store/main";
import { useSettings } from "@/store/settings";

const gameSession = useGameSession();
const settings = useSettings();
const store = useStore();
</script>

<style scoped>
.players-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.players-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 30px 0;
}

h1 {
  margin: 0;
  text-align: center;
}

.chip.you {
  background-color: #568203 !important;
}

.chip span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
