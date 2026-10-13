<template>
  <UsernameDialog v-if="!store.username" />
  <ErrorOverlay v-if="showGlobalError" />

  <MainArea>
    <Sidebar v-if="gameSession.data.isInLobby">
      <div class="lobby-name">
        <p>{{ gameSession.data.lobbyName }}'s lobby</p>
      </div>
      <LobbyInvite />
      <Separator />
      <SettingsPanel :summary="true" />
    </Sidebar>

    <ContentContainer>
      <div v-if="gameSession.data.isInLobby" class="lobby-content">
        <PlayersList />
        <AdminControls v-if="gameSession.data.hasAdminAccess" />
        <StartingCountdown v-if="gameSession.data.gameState === GameState.STARTING" />
      </div>
      <GameFrame v-else-if="gameSession.data.gameState === GameState.ROUND_RUNNING" />
      <RoundSummary v-else-if="gameSession.data.gameState === GameState.ROUND_SUMMARY" />
      <Loading v-else />
    </ContentContainer>
  </MainArea>

  <Footer />
</template>

<script setup lang="ts">
import AdminControls from "@/components/game/AdminControls.vue";
import ErrorOverlay from "@/components/game/ErrorOverlay.vue";
import GameFrame from "@/components/game/GameFrame.vue";
import PlayersList from "@/components/game/PlayersList.vue";
import RoundSummary from "@/components/game/round/RoundSummary.vue";
import StartingCountdown from "@/components/game/StartingCountdown.vue";
import LobbyInvite from "@/components/lobby/LobbyInvite.vue";
import SettingsPanel from "@/components/settings/SettingsPanel.vue";
import ContentContainer from "@/components/ui/ContentContainer.vue";
import Footer from "@/components/ui/Footer.vue";
import Loading from "@/components/ui/Loading.vue";
import MainArea from "@/components/ui/MainArea.vue";
import Separator from "@/components/ui/Separator.vue";
import Sidebar from "@/components/ui/Sidebar.vue";
import UsernameDialog from "@/components/username/UsernameDialog.vue";
import { useGameSession } from "@/composables/useGameSession";
import { useStore } from "@/store/main";
import { GameState } from "@/types/game";
import { MessageType } from "@/types/websocket";
import { computed, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";

const gameSession = useGameSession();
const store = useStore();
const route = useRoute();

const showGlobalError = computed(() => {
  return (
    (gameSession.data.errorCode && gameSession.data.isInLobby) ||
    (gameSession.data.errorCode && gameSession.data.gameState === GameState.NONE)
  );
});

watchEffect(() => {
  if (
    !store.username ||
    !gameSession.isWebSocketReady.value ||
    gameSession.data.gameState !== GameState.NONE
  ) {
    return;
  }

  gameSession.data.clientTimeOnJoin = performance.now();
  gameSession.send({
    type: MessageType.JOIN_GAME,
    data: {
      username: store.username,
      lobbyName: route.params.lobbyName,
      lobbyCode: route.params.lobbyCode,
      token: store.token,
    },
  });
});

onMounted(() => {
  window.onbeforeunload = () => true;
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.lobby-name {
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
}
.lobby-name p {
  margin-bottom: 0;
}

.lobby-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15% 5%;
}

.loading {
  height: 15%;
  max-height: 200px;
}
</style>
