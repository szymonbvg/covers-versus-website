<template>
  <div class="round-progress">
    <div class="timer">
      <span
        :style="{ '--remaining': `${timerPercentage <= 0 ? 0 : timerPercentage}%` }"
        :class="{ deadline: remaining <= 10 * 1000 }"
      >
      </span>
    </div>
    <div class="finished-count">
      <span>{{ gameSession.data.roundFinishedCount }} / {{ gameSession.data.players.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";
import { useSettings } from "@/store/settings";
import { computed, onMounted, onUnmounted, ref } from "vue";

const gameSession = useGameSession();
const settings = useSettings();

const remaining = ref(settings.roundTimeSeconds * 1000);

const timerPercentage = computed(() => {
  return (remaining.value / (settings.roundTimeSeconds * 1000)) * 100;
});

const getSyncServerTime = (): number | null => {
  const { syncTime } = gameSession.data;
  if (!syncTime) return null;
  return syncTime.server + (performance.now() - syncTime.client);
};

const updateRemaining = () => {
  const serverTime = getSyncServerTime();
  if (!gameSession.data.roundEndTime || !serverTime) return;

  remaining.value = gameSession.data.roundEndTime - serverTime;

  if (remaining.value < 1000) {
    remaining.value = 0;
    clearInterval(interval);
  }
};

let interval: number | undefined;
onMounted(() => {
  updateRemaining();
  interval = setInterval(updateRemaining, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.round-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  height: 100%;
  gap: 15px;
  width: 100%;
}

.timer {
  display: flex;
  flex: 1;
  height: 10px;
}

.finished-count {
  z-index: 1;
  font-weight: bold;
  font-size: 18px;
}

.timer span {
  width: 100%;
  height: 100%;
  --remaining: 100%;
  background-color: #43403e;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  box-shadow: 6px 6px #1b1a18;
}
.timer span::before {
  content: "";
  position: absolute;
  inset: 0;
  width: var(--remaining);
  background-color: #c3671e;
  transition: width 1s;
}
.timer span.deadline::before {
  animation: blink 0.5s infinite;
}

@keyframes blink {
  from {
    background-color: red;
  }

  to {
    background-color: yellow;
  }
}
</style>
