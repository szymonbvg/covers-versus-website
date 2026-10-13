<template>
  <div class="game-frame">
    <RoundProgressBar />
    <GameCover />
    <RoundLives />
    <RoundControls
      v-if="gameSession.data.lives > 0 && !gameSession.data.guessedCategories[GuessCategory.GAME]"
    />
    <div v-else class="no-more-attempts">
      <Separator />
      <span>{{
        gameSession.data.guessedCategories[GuessCategory.GAME] ? "You guessed the game" : "No more attempts"
      }}</span>
      <span>Wait for the round to end to see the results</span>
    </div>
    <GuessedCategories v-if="hasGuessedCategory" />
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession.ts";
import GameCover from "./round/GameCover.vue";
import RoundLives from "./round/RoundLives.vue";
import RoundControls from "./round/RoundControls.vue";
import GuessedCategories from "./round/GuessedCategories.vue";
import Separator from "../ui/Separator.vue";
import { GuessCategory } from "@/types/game.ts";
import { ref, watch } from "vue";
import RoundProgressBar from "./round/RoundProgressBar.vue";

const gameSession = useGameSession();

const hasGuessedCategory = ref(false);

watch(gameSession.data.guessedCategories, (newValue) => {
  if (hasGuessedCategory.value) return;

  hasGuessedCategory.value = Object.keys(newValue).length > 0;
});
</script>

<style scoped>
.game-frame {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-width: 1024px;
  margin-bottom: auto;
  gap: 15px;
}

.no-more-attempts {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
}

.separator {
  background-color: #534e4c !important;
}
</style>
