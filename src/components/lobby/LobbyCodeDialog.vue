<template>
  <InputDialog
    :closeable="true"
    :title="`lobbycode.exe | ${props.lobbyName}'s lobby`"
    :input-reg-exp="new RegExp('^.{6}$')"
    placeholder="super secret code here"
    button-label="Join"
    @confirm="handleJoin"
    @close="isVisible = false"
  />
</template>

<script setup lang="ts">
import { router } from "@/router/index.ts";
import InputDialog from "../ui/InputDialog.vue";

const isVisible = defineModel<boolean>("isVisible");
const props = defineProps<{ lobbyName: string }>();

const handleJoin = (value: string) => {
  router.replace(`/game/${props.lobbyName}/${value}`);
};
</script>
