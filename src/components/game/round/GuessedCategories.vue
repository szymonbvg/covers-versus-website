<template>
  <div class="guessed-categories-table">
    <span class="header">Correctly Guessed:</span>
    <div class="categories">
      <div v-for="(value, category) in gameSession.data.guessedCategories" class="category" :key="category">
        <span class="header">{{ GUESS_CATEGORY_DEFINITIONS[Number(category) as GuessCategory] }}:</span>
        <div class="values">
          <span v-if="Array.isArray(value)" v-for="e in value">{{ e.name }}</span>
          <span v-else>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { GuessCategory } from "@/types/game";
import { GUESS_CATEGORY_DEFINITIONS } from "./guess-categories.definitions";

const gameSession = useGameSession();
</script>

<style scoped>
.guessed-categories-table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  gap: 15px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 15px;
}

.category {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3f704d;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 15px;
  box-shadow: 8px 8px #1b1a18;
}

.values {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.header {
  font-weight: bold;
}
</style>
