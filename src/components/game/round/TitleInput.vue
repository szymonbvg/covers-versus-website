<template>
  <div class="title-input">
    <input type="text" v-model="titleInput" placeholder="Search for a video game..." />
    <div v-if="getNormalized(titleInput).length > 0" class="titles">
      <span v-if="fetchingTitles" class="title-elem">Loading...</span>
      <span
        v-else
        v-for="(title, index) in matchedTitles"
        :style="{ borderBottom: index >= matchedTitles.length - 1 ? 'none' : '1px solid #302e2d' }"
        class="title-elem"
        @click="() => handleTitleSelected(title)"
        :key="title.value"
      >
        <template v-for="part in getHighlighted(title.label)">
          <strong v-if="part.match" class="matched">{{ part.text }}</strong>
          <template v-else>{{ part.text }}</template>
        </template>
      </span>
    </div>
    <span v-if="selectedTitle" class="title-elem selected" @click="selectedTitle = null">
      Selected: <strong>{{ selectedTitle.label }}</strong>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { AutocompletionTitle, GamedleAutocompletion } from "@/types/game";
import axios from "axios";
import { ref, watch } from "vue";

const SPACES_REGEXP = new RegExp(" +", "g");

const cachedResults = new Map<string, GamedleAutocompletion[]>();

const selectedTitle = ref<AutocompletionTitle | null>(null);
const matchedTitles = ref<GamedleAutocompletion[]>([]);
const titleInput = ref("");
const fetchingTitles = ref(false);

const handleTitleSelected = (title: GamedleAutocompletion) => {
  selectedTitle.value = {
    id: title.value,
    label: title.label,
  };
  titleInput.value = title.label;
};

const handleAutocompletion = async () => {
  const normalizedTitle = getNormalized(titleInput.value);
  const encodedTitle = encodeURIComponent(normalizedTitle);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/autocomplete?q=${encodedTitle}`);

  matchedTitles.value = res.data;
  if (!cachedResults.has(normalizedTitle)) {
    cachedResults.set(normalizedTitle, res.data);
  }

  fetchingTitles.value = false;
};

let autocompletionTimeout: number | undefined;
watch(titleInput, (newValue, prev) => {
  const normalizedNew = getNormalized(newValue);

  if (selectedTitle.value && normalizedNew === selectedTitle.value.label) {
    return;
  }

  const normalizedPrev = getNormalized(prev);

  if (normalizedNew === normalizedPrev || newValue.length <= 0) {
    return;
  }

  fetchingTitles.value = true;

  clearTimeout(autocompletionTimeout);

  if (cachedResults.has(normalizedNew)) {
    matchedTitles.value = cachedResults.get(normalizedNew) ?? [];
    fetchingTitles.value = false;
    return;
  }

  autocompletionTimeout = setTimeout(handleAutocompletion, 500);
});

function getHighlighted(str: string): { text: string; match: boolean }[] {
  const query = getNormalized(titleInput.value);
  if (!query) return [];

  const escaped = query.replace(new RegExp("[.*+?^${}()|[\]\\]", "g"), "\\$&");
  const regExp = new RegExp(`(${escaped})`, "gi");

  return str.split(regExp).map((text) => ({ text, match: regExp.test(text) }));
}

function getNormalized(str: string): string {
  return str.replace(SPACES_REGEXP, " ").trim();
}

defineExpose({ inputValue: titleInput, selectedTitle });
</script>

<style scoped>
.title-input,
input {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
}

.titles {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 8px;
}

.title-elem {
  width: 100%;
  background-color: #43403e;
  white-space: normal;
  line-height: 1.5;
  padding: 15px;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: normal;
  text-align: left;
}
.title-elem:not(:active):hover {
  background-color: #534e4c;
}

.selected {
  border-radius: 8px;
}
.selected:hover {
  text-decoration: line-through;
}

.matched {
  color: #74c365;
}

input {
  height: 50px;
  font-weight: bold;
  font-size: 17px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 8px 8px #1b1a18;
  background-color: #43403e;
}
</style>
