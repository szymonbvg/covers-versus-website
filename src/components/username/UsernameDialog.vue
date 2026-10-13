<template>
  <InputDialog
    :closeable="false"
    :input-reg-exp="RegExp('^[A-Za-z0-9]{1,16}$', 'i')"
    title="username.exe"
    placeholder="super cool username here"
    button-label="Confirm"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { useStore } from "@/store/main.ts";
import InputDialog from "../ui/InputDialog.vue";

const store = useStore();

const handleConfirm = (value: string) => {
  store.updateUsername(value);
};
</script>
