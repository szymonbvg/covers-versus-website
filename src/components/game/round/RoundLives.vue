<template>
  <div class="lives">
    <div class="icons">
      <div class="heart-icons">
        <img v-for="i in 4" :src="i <= data.lives ? FullHeart : EmptyHeart" />
      </div>
      <div class="guess-icons">
        <div v-for="(_, i) in data.roundGuessHistory" class="tooltip" :key="i">
          <template v-if="data.roundGuessHistory[data.roundGuessHistory.length - 1 - i].hasGuessed">
            <img src="@/assets/checkmark.svg" />
            <span class="tooltip-text">
              {{ data.roundGuessHistory[data.roundGuessHistory.length - 1 - i].value }}
            </span>
          </template>
          <template v-else>
            <img src="@/assets/xmark.svg" />
            <span class="tooltip-text wrong">
              {{ data.roundGuessHistory[data.roundGuessHistory.length - 1 - i].value }}
            </span>
          </template>
        </div>
      </div>
    </div>
    <div class="text-lives-container">
      <span class="lives-separator"></span>
      <div>
        <span>{{ data.lives }} lives remainig</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyHeart from "@/assets/emptyheart.webp";
import FullHeart from "@/assets/fullheart.webp";
import { useGameSession } from "@/composables/useGameSession";

const { data } = useGameSession();
</script>

<style scoped>
.lives {
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
}

.icons {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.lives-separator {
  background-color: whitesmoke;
  width: 1px;
  height: 22px;
}

.heart-icons,
.guess-icons {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.guess-icons {
  margin-left: auto;
}

.text-lives-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 28px;
}

img {
  image-rendering: pixelated;
  width: 28px;
  height: 28px;
}
</style>
