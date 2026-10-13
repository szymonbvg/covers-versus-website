<template>
  <div class="cover">
    <Loading v-if="isLoading || !coverSrc" />
    <img v-if="coverSrc" :src="coverSrc" @load="isLoading = false" />
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { computed, ref } from "vue";
import Loading from "@/components/ui/Loading.vue";
import { GameState } from "@/types/game";

const { data } = useGameSession();

const isLoading = ref(true);

const coverSrc = computed(() => {
  if (!data.coverId) return null;
  let part = `_p${Math.min(4 - data.lives, 3)}`;
  if (data.guessedCategories[0] || data.gameState === GameState.ROUND_SUMMARY) {
    part = "";
  }
  return `${import.meta.env.VITE_GAMEDLE_CDN_URL}/covers/webp/${data.coverId}${part}.webp`;
});
</script>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

img {
  width: 300px;
  height: 100%;
  border-radius: 6px;
  border: 1px solid #3f704d;
  box-shadow: 6px 6px #1b1a18;
}

.loading {
  position: absolute;
  z-index: 1;
  height: 100px;
}
</style>
