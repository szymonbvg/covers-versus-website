<template>
  <div class="controls">
    <div class="buttons">
      <button
        :disabled="gameSession.data.waitingForGuessResult"
        :style="{ '--progress': `${skipProgress >= 100 ? 100 : skipProgress}%` }"
        class="skip"
        @pointerdown="startSkipHold"
        @pointerup="clearSkipInterval"
        @pointerleave="clearSkipInterval"
        @pointercancel="clearSkipInterval"
      >
        <span>{{ skipProgress > 0 ? "Keep pressing!" : "Skip" }}</span>
      </button>
      <button :disabled="guessBtnDisabled" class="guess" @click="guess">
        GUESS!
        <Loading v-if="gameSession.data.waitingForGuessResult" />
      </button>
    </div>
    <TitleInput ref="titleInput" />
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { computed, ref, useTemplateRef } from "vue";
import TitleInput from "./TitleInput.vue";
import { MessageType } from "@/types/websocket.ts";
import { GameState, RoundActionType } from "@/types/game.ts";
import Loading from "@/components/ui/Loading.vue";

const gameSession = useGameSession();

const titleInput = useTemplateRef("titleInput");
const skipProgress = ref(0);

let skipInterval: number | undefined;

const guessBtnDisabled = computed(() => {
  return (
    !titleInput.value?.selectedTitle ||
    gameSession.data.waitingForGuessResult ||
    gameSession.data.gameState !== GameState.ROUND_RUNNING
  );
});

const startSkipHold = () => {
  if (skipInterval) return;

  skipInterval = setInterval(() => {
    skipProgress.value++;

    if (skipProgress.value >= 115) {
      skip();
      clearSkipInterval();
    }
  }, 7);
};
const clearSkipInterval = () => {
  clearInterval(skipInterval);
  skipInterval = undefined;
  skipProgress.value = 0;
};

const removeHeart = (): boolean => {
  if (gameSession.data.lives <= 0) return false;
  gameSession.data.lives--;
  return true;
};

const skip = () => {
  if (
    !removeHeart() ||
    gameSession.data.waitingForGuessResult ||
    gameSession.data.gameState !== GameState.ROUND_RUNNING
  ) {
    return;
  }

  gameSession.data.roundGuessHistory.push({ value: "Skip", hasGuessed: false });

  if (titleInput.value) {
    titleInput.value.selectedTitle = null;
    titleInput.value.inputValue = "";
  }

  gameSession.send({
    type: MessageType.PLAYER_ROUND_ACTION,
    data: { type: RoundActionType.SKIP },
  });
};

const guess = () => {
  if (!removeHeart() || guessBtnDisabled.value) return;

  const selectedTitle = titleInput.value?.selectedTitle;

  gameSession.data.waitingForGuessResult = true;
  gameSession.send({
    type: MessageType.PLAYER_ROUND_ACTION,
    data: { type: RoundActionType.GUESS, gameId: selectedTitle?.id, gameTitle: selectedTitle?.label },
  });

  titleInput.value!.selectedTitle = null;
  titleInput.value!.inputValue = "";
};
</script>

<style scoped>
.controls,
.buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.buttons {
  flex-direction: row;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex: 1;
  height: 50px;
}

.skip {
  --progress: 0%;
  background-color: #c3671e;
  overflow: hidden;
  position: relative;
}

.skip::before {
  content: "";
  position: absolute;
  inset: 0;
  width: var(--progress);
  background-color: #8b4c19;
}
.skip span {
  position: relative;
  z-index: 1;
}

.guess {
  flex: 1.25;
  background-color: #0d6efd;
}
.guess:not(:active):hover {
  background-color: #1957b3;
}

.loading {
  height: 30px;
}
</style>
