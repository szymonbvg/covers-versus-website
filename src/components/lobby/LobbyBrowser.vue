<template>
  <div class="browser-content">
    <h1>Available Lobbies:</h1>
    <div class="available-lobbies">
      <Loading v-if="!lobbies" />
      <div v-else-if="lobbies.length > 0" class="chip-list">
        <LobbyEntry v-for="lobbyData in lobbies" :data="lobbyData" :key="lobbyData.lobbyName" />
      </div>
      <div v-else>
        <span>No lobbies found</span>
      </div>
      <Error v-if="showError" message="Something went wrong, sorry" />
    </div>
    <HorizontalScroller
      ref="scroller"
      :left-disabled="scrollerLDisabled"
      :right-disabled="scrollerRDisabled"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, useTemplateRef, watch, watchEffect } from "vue";
import HorizontalScroller from "../ui/HorizontalScroller.vue";
import type { LobbyData } from "@/types/game.ts";
import LobbyEntry from "./LobbyEntry.vue";
import Error from "../ui/Error.vue";
import Loading from "../ui/Loading.vue";

const lobbies = ref<LobbyData[] | undefined>();
const showError = ref(false);

const scrollerRef = useTemplateRef("scroller");
const scrollerLDisabled = ref(true);
const scrollerRDisabled = ref(true);

const fetchLobbies = async () => {
  try {
    if (!scrollerRef.value) throw new Error();
    lobbies.value = undefined;

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/games?i=${scrollerRef.value.currentPage}`);
    lobbies.value = res.data;
  } catch (_) {
    showError.value = true;
  }
};

watchEffect(() => {
  scrollerLDisabled.value =
    !lobbies.value || ((lobbies.value?.length ?? 0) <= 0 && (scrollerRef.value?.currentPage ?? 0) <= 0);
  scrollerRDisabled.value = !lobbies.value || (lobbies.value?.length ?? 0) <= 0;
});

let scrollerInitialized = false;
watch(
  () => scrollerRef.value?.currentPage,
  () => {
    if (!scrollerInitialized) {
      scrollerInitialized = true;
      return;
    }
    fetchLobbies();
  }
);

onMounted(() => {
  fetchLobbies();
});
</script>

<style scoped>
.lobby-browser {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.browser-content {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 15% 5%;
  flex-direction: column;
  box-sizing: border-box;
}

.available-lobbies {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 30px 0;
  gap: 30px;
}

.loading {
  height: 20%;
  max-height: 110px;
}

h1 {
  margin: 0;
  text-align: center;
}
</style>
