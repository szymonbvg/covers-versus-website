<template>
  <div class="chip-container">
    <div class="chip lobby-entry" @click="handleClick">
      <div class="lobby-name">
        <span>{{ data.lobbyName }}</span>
      </div>
      <img v-if="data.isPrivate" src="@/assets/lock.svg" />
    </div>
    <LobbyCodeDialog v-if="showCodeDialog" v-model:is-visible="showCodeDialog" :lobby-name="data.lobbyName" />
  </div>
</template>

<script setup lang="ts">
import type { LobbyData } from "@/types/game";
import LobbyCodeDialog from "./LobbyCodeDialog.vue";
import { ref } from "vue";
import { useStore } from "@/store/main.ts";
import { router } from "@/router/index.ts";

const { data } = defineProps<{ data: LobbyData }>();

const store = useStore();
const showCodeDialog = ref(false);

const handleClick = () => {
  if (!store.username) return;

  if (data.isPrivate) {
    showCodeDialog.value = true;
    return;
  }

  router.replace(`/game/${data.lobbyName}`);
};
</script>

<style scoped>
.lobby-entry:hover {
  background-color: #363433;
  text-decoration: underline;
}

.lobby-name {
  width: 100%;
  text-align: center;
  font-weight: bold;
  cursor: default;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

img {
  height: 50px;
  padding: 10px;
  padding-right: 0;
  box-sizing: border-box;
}
</style>
