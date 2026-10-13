<template>
  <div class="invite-container">
    <div class="invite">
      <span v-if="gameSession.data.lobbyCode" class="code">Code: {{ gameSession.data.lobbyCode }}</span>
      <div class="invite-url">
        <span>{{ inviteUrl }}</span>
      </div>
      <button @click="copyToClipboard">Copy Link</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameSession } from "@/composables/useGameSession";

const inviteUrl = window.location.href;

const gameSession = useGameSession();

const copyToClipboard = () => {
  navigator.clipboard.writeText(inviteUrl).catch(() => {});
};
</script>

<style scoped>
.invite-container {
  background-color: #43403e;
  border-radius: 8px;
  width: 100%;
  box-shadow: 8px 8px #1b1a18;
}

.code {
  font-weight: bold;
  font-size: 18px;
}

.invite {
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
}

.invite-url {
  display: flex;
  min-height: 50px;
  align-items: center;
  background-color: #363433;
  color: whitesmoke;
  border-radius: 8px;
  overflow: hidden;
}
.invite-url span {
  padding: 15px;
  overflow-x: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}

button {
  width: 100%;
  height: 50px;
}
</style>
