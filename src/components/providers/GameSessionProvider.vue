<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useStore } from "@/store/main";
import { useSettings } from "@/store/settings";
import {
  GameState,
  type BaseGameData,
  type GameData,
  type GameRanking,
  type GameSessionContext,
  type GameSettings,
} from "@/types/game";
import { MessageType, WSError, type WSMessage } from "@/types/websocket";
import { onMounted, onUnmounted, provide, reactive, ref, shallowRef } from "vue";
import { RouterView } from "vue-router";

const store = useStore();
const settings = useSettings();

const ws = shallowRef<WebSocket | null>(null);
const isWebSocketReady = ref(false);
const data = reactive<GameData>({
  players: [],
  hasAdminAccess: false,
  gameState: GameState.NONE,
  isInLobby: false,
  isFinalRound: false,
  lives: 4,
  roundGuessHistory: [],
  guessedCategories: {},
  roundFinishedCount: 0,
  readyPlayers: new Set(),
  waitingForGuessResult: false,
  clientTimeOnJoin: 0,
});

let hearbeatTimeout: number | undefined = undefined;

const initWebSocket = () => {
  const socket = new WebSocket(import.meta.env.VITE_WS_URL);

  socket.onopen = () => {
    isWebSocketReady.value = true;
    resetHeartbeat();
  };

  socket.onmessage = messageHandler;

  socket.onclose = cleanup;
  socket.onerror = cleanup;

  ws.value = socket;
};

const messageHandler = (event: MessageEvent) => {
  if (!ws.value) return;

  resetHeartbeat();

  const message = JSON.parse(event.data) as WSMessage;

  switch (message.type) {
    case MessageType.JOIN_SUCCESS: {
      let t0 = data.clientTimeOnJoin;
      if (t0 <= 0) {
        t0 = performance.now();
      }
      const timeOnResponse = performance.now();
      const msgData = message.data as BaseGameData & { gameSettings: GameSettings; serverTime: number };

      const rtt = t0 - timeOnResponse;
      const clientSyncTime = t0 + rtt / 2;

      data.syncTime = {
        client: clientSyncTime,
        server: msgData.serverTime,
      };

      store.updateToken(undefined);

      settings.$state = msgData.gameSettings;

      data.lobbyName = msgData.lobbyName;
      data.lobbyCode = msgData.lobbyCode;
      data.hasAdminAccess = msgData.hasAdminAccess;

      data.gameState = GameState.IN_LOBBY;
      data.isInLobby = true;
      break;
    }

    case MessageType.PLAYERS_LIST_UPDATED: {
      const players = message.data as string[];
      data.players = players;
      break;
    }

    case MessageType.ROUND_STARTED: {
      const msgData = message.data as { round: number; coverId?: string; endTime: number };

      data.readyPlayers = undefined;
      data.roundFinishedCount = 0;

      data.ranking = undefined;
      data.roundEndTime = msgData.endTime;
      data.coverId = msgData.coverId;
      data.lives = 4;

      data.correctTitle = undefined;
      data.roundGuessHistory = [];
      data.guessedCategories = {};

      data.isInLobby = false;
      data.gameState = GameState.ROUND_RUNNING;
      break;
    }

    case MessageType.ROUND_ENDED: {
      const msgData = message.data as {
        gameTitle?: string;
        final: boolean;
        round: number;
        ranking: GameRanking;
      };

      data.readyPlayers = new Set();

      data.correctTitle = msgData.gameTitle;
      data.ranking = msgData.ranking;
      data.isFinalRound = msgData.final;
      data.gameState = GameState.ROUND_SUMMARY;
      break;
    }

    case MessageType.GUESS_RESULT: {
      const msgData = message.data as { title: string; guessedCategories: Record<number, unknown> | null };

      const hasGuessed = msgData.guessedCategories !== null;
      data.roundGuessHistory.push({ value: msgData.title, hasGuessed });
      data.waitingForGuessResult = false;

      if (!hasGuessed) break;

      Object.assign(data.guessedCategories, msgData.guessedCategories);
      break;
    }

    case MessageType.PLAYER_STATUS_UPDATED: {
      const msgData = message.data as { username: string; isReady: boolean };
      if (msgData.isReady) {
        data.readyPlayers?.add(msgData.username);
        return;
      }
      data.readyPlayers?.delete(msgData.username);
      break;
    }

    case MessageType.ROUND_PROGRESS_UPDATED: {
      data.roundFinishedCount = message.data as number;
      break;
    }

    case MessageType.WAITING_FOR_PLAYERS: {
      data.gameState = GameState.STARTING;
      break;
    }

    case MessageType.ERROR:
      const { code } = message.data as { code: number };

      if (code === WSError.UNAUTHORIZED || code === WSError.LOBBY_NOT_FOUND) {
        store.updateToken(undefined);
      }

      data.errorCode = code;
      break;
  }
};

const send = (message: WSMessage) => {
  ws.value?.send(JSON.stringify(message));
  resetHeartbeat();
};

const resetHeartbeat = () => {
  clearTimeout(hearbeatTimeout);

  hearbeatTimeout = setTimeout(() => {
    send({ type: MessageType.PING });
  }, 60000);
};

const cleanup = () => {
  ws.value = null;
  isWebSocketReady.value = false;
  data.gameState = GameState.NONE;
  data.errorCode = WSError.DISCONNECTED;
};

const destroyWebSocket = () => {
  ws.value?.close();
  cleanup();
};

onMounted(initWebSocket);
onUnmounted(destroyWebSocket);

provide<GameSessionContext>("gameSession", { isWebSocketReady, data, send });
</script>
