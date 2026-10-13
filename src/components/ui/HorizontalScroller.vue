<template>
  <div class="horizontal-scroller">
    <button v-if="currentPage > 0" :disabled="props.leftDisabled">
      <img
        class="arrow-left"
        :class="{ disabled: props.leftDisabled }"
        src="@/assets/arrow.svg"
        data-direction="-1"
        @click="changePage"
      />
    </button>
    <span class="current-page">{{ currentPage + 1 }}</span>
    <button :disabled="props.rightDisabled">
      <img
        class="arrow-right"
        :class="{ disabled: props.rightDisabled }"
        src="@/assets/arrow.svg"
        data-direction="1"
        @click="changePage"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{ leftDisabled?: boolean; rightDisabled?: boolean }>(), {
  leftDisabled: false,
  rightDisabled: false,
});

const currentPage = ref(0);

const changePage = (event: Event) => {
  const target = event.target as HTMLImageElement;
  const direction = Number(target.dataset.direction);
  const newPage = currentPage.value + direction;

  if (newPage < 0 || (props.leftDisabled && direction <= -1) || (props.rightDisabled && direction >= 1)) {
    return;
  }

  currentPage.value = newPage;
};

defineExpose({
  currentPage,
});
</script>

<style scoped>
.horizontal-scroller {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  gap: 15px;
}

.current-page,
button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.current-page {
  width: 60px;
  min-width: 60px;
  font-weight: bold;
  background-color: #43403e;
  box-shadow: 8px 8px #1b1a18;
  border-radius: 8px;
}

button {
  width: 30px;
  min-width: 30px;
}

.arrow-left {
  transform: scaleX(-1);
}

img {
  filter: invert();
  padding: 5px;
  width: 22px;
  box-sizing: border-box;
}
img.disabled {
  filter: none !important;
}
</style>
