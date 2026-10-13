<template>
  <div class="host-lobby">
    <button :disabled="!store.username || isWaiting" @click="handleClick">
      Host Lobby
      <Loading v-if="isWaiting" />
    </button>
    <span v-if="store.token && store.username" @click="router.replace(`/game/${store.username}`)">
      Looks like you already have a lobby waiting for activation<br />(click to redirect)
    </span>
    <Error v-if="errMessage" :message="errMessage" />
  </div>
</template>

<script setup lang="ts">
import { router } from "@/router";
import { useStore } from "@/store/main";
import { useSettings } from "@/store/settings";
import axios, { AxiosError } from "axios";
import { ref } from "vue";
import Error from "../ui/Error.vue";
import Loading from "../ui/Loading.vue";

const store = useStore();
const settings = useSettings();

const isWaiting = ref(false);
const errMessage = ref<string | undefined>();

const handleClick = async () => {
  try {
    if (!store.username || isWaiting.value) return;
    isWaiting.value = true;
    errMessage.value = undefined;

    const { maxPlayers, rounds, roundTimeSeconds, difficulty, isPrivate } = settings;

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/host_game`, {
      username: store.username,
      gameSettings: {
        maxPlayers,
        rounds,
        roundTimeSeconds,
        difficulty: Number(difficulty) || 2,
        isPrivate,
      },
    });
    isWaiting.value = false;

    const { token, lobbyCode } = res.data;
    if (!token) return;

    store.updateToken(token);
    let to = `/game/${store.username}`;
    if (lobbyCode) {
      to += `/${lobbyCode}`;
    }
    router.replace(to);
  } catch (e) {
    isWaiting.value = false;
    let msg = "Something went wrong, sorry";
    if (e instanceof AxiosError && e.response) {
      const { message } = e.response.data as { message?: string };
      msg = message ?? msg;
    }
    errMessage.value = msg;
  }
};
</script>

<style scoped>
.host-lobby {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  max-height: 50px;
  gap: 15px;
}

.loading {
  height: 100%;
  padding: 8px;
}

span {
  text-align: center;
  cursor: default;
}
span:hover {
  text-decoration: underline;
}
</style>
