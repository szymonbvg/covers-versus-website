<template>
  <div class="game-summary">
    <GameCover />
    <h1>{{ gameSession.data.correctTitle ?? "Something went wrong while loading title" }}</h1>
    <div v-if="!gameSession.data.isFinalRound" class="ready">
      <button :disabled="readyRequested" @click="updateReadyStatus">
        Ready
        <span>
          {{ `${gameSession.data.readyPlayers?.size ?? 0} / ${gameSession.data.players.length}` }}
        </span>
      </button>
      <Loading v-if="readyRequested" />
    </div>
    <button v-else @click="goToHomePage">Go to home page</button>
    <div class="leadboard">
      <div
        v-for="(player, index) in sortedRanking"
        class="leadboard-entry"
        :class="{ final: gameSession.data.isFinalRound }"
        :key="player.username"
      >
        <div class="leadboard-category username">
          <span>{{ index + 1 }}.</span>
          <span :class="{ ready: gameSession.data.readyPlayers?.has(player.username) }">
            <strong v-if="player.username === store.username">> {{ player.username }} <</strong>
            <template v-else>{{ player.username }}</template>
          </span>
        </div>
        <div class="leadboard-category">
          <span>Score: {{ player.totalScore }}</span>
        </div>
        <div class="leadboard-category">
          <span>Guesses:</span>
          <div v-for="(_, i) in 4" class="icon">
            <div class="tooltip" v-if="player.lastRound[i]">
              <img
                v-if="
                  player.lastRound[i].action === RoundActionType.GUESS &&
                  (player.lastRound[i].guessResult?.length ?? 0) > 0
                "
                src="@/assets/checkmark.svg"
              />
              <img v-else src="@/assets/xmark.svg" />
              <span
                class="tooltip-text"
                :class="{ wrong: (player.lastRound[i].guessResult?.length ?? 0) <= 0 }"
              >
                {{ getTooltipLabelsFromResult(player.lastRound[i].guessResult) }}
              </span>
            </div>
            <span v-else class="no-action">-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import GameCover from "./GameCover.vue";
import { useGameSession } from "@/composables/useGameSession.ts";
import { GUESS_CATEGORY_DEFINITIONS } from "./guess-categories.definitions.ts";
import { RoundActionType } from "@/types/game.ts";
import { MessageType } from "@/types/websocket.ts";
import Loading from "@/components/ui/Loading.vue";
import { useStore } from "@/store/main.ts";
import { router } from "@/router/index.ts";

const gameSession = useGameSession();
const store = useStore();

const readyRequested = ref(false);

const sortedRanking = computed(() => {
  if (!gameSession.data.ranking) return [];
  return Object.values(gameSession.data.ranking).sort((a, b) => b.totalScore - a.totalScore);
});

const updateReadyStatus = () => {
  if (readyRequested.value || gameSession.data.isFinalRound) return;

  readyRequested.value = true;
  gameSession.send({ type: MessageType.PLAYER_READY });
};

const goToHomePage = async () => {
  await router.replace("/");
};

function getTooltipLabelsFromResult(result?: number[]): string {
  if (result === undefined) return "Skip";
  else if (result.length <= 0) return "Wrong Guess";

  const labels: string[] = [];
  for (const i of result) {
    labels.push(GUESS_CATEGORY_DEFINITIONS[i]);
  }
  return labels.join(", ");
}
</script>

<style scoped>
.game-summary {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-bottom: auto;
  margin-top: 15px;
  gap: 15px;
}

.leadboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  margin-top: 15px;
  gap: 15px;
  padding: 15px;
  box-sizing: border-box;
}

.leadboard-entry {
  display: flex;
  padding: 15px 30px;
  min-height: 50px;
  background-color: #43403e;
  box-shadow: 8px 8px #1b1a18;
  border-radius: 8px;
  box-sizing: border-box;
  overflow-x: auto;
  gap: 50px;
  white-space: nowrap;
}
.leadboard-entry.final:nth-child(1) {
  border: 2px solid yellow;
}
.leadboard-entry.final:nth-child(2) {
  border: 2px solid silver;
}
.leadboard-entry.final:nth-child(3) {
  border: 2px solid #cd7f32;
}

.ready {
  color: #629503 !important;
}

.leadboard-category {
  display: flex;
  align-items: center;
  gap: 15px;
}

.username {
  width: 100%;
}

h1 {
  margin: 0;
  margin-bottom: 15px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  min-width: 150px;
  padding: 0 15px;
  gap: 15px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

img,
.no-action {
  width: 22px;
}
.no-action {
  text-align: center;
}

.ready {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.loading {
  width: 35px;
  height: 35px;
}
</style>
