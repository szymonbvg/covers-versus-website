<template>
  <Error v-if="gameSession.data.errorCode" :message="ERROR_MESSAGES[gameSession.data.errorCode]" />
</template>

<script setup lang="ts">
import { WSError } from "@/types/websocket";
import Error from "../ui/Error.vue";
import { useGameSession } from "@/composables/useGameSession.ts";

const gameSession = useGameSession();

const ERROR_MESSAGES: Record<number, string> = {
  [WSError.LOBBY_NOT_FOUND]: "Lobby not found",
  [WSError.LOBBY_IS_FULL]: "Lobby is full",
  [WSError.INVALID_LOBBY_CODE]: "Invalid lobby code",
  [WSError.INVALID_USERNAME]: "Invalid username. Use only letters and numbers (1-16 chars)",
  [WSError.USERNAME_UNAVAILABLE]: "Player with your username is already in lobby",
  [WSError.GAME_ALREADY_STARTED]: "Game has already started",
  [WSError.ROUND_ALREADY_ENDED]: "Round has already ended",
  [WSError.UNAUTHORIZED]: "Unauthorized",
  [WSError.DISCONNECTED]: "Disconnected. You may have lost connection or the host ended the session",
};
</script>
