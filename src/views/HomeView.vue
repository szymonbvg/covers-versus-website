<template>
  <UsernameDialog v-if="!store.username" />

  <MainArea>
    <Sidebar>
      <UsernameCard />
      <Separator />
      <SettingsPanel />
      <HostLobby />
    </Sidebar>

    <ContentContainer>
      <LobbyBrowser />
    </ContentContainer>
  </MainArea>

  <Footer />
</template>

<script setup lang="ts">
import SettingsPanel from "@/components/settings/SettingsPanel.vue";
import Sidebar from "@/components/ui/Sidebar.vue";
import Separator from "@/components/ui/Separator.vue";
import UsernameCard from "@/components/username/UsernameCard.vue";
import UsernameDialog from "@/components/username/UsernameDialog.vue";
import LobbyBrowser from "@/components/lobby/LobbyBrowser.vue";
import HostLobby from "@/components/lobby/HostLobby.vue";
import ContentContainer from "@/components/ui/ContentContainer.vue";
import Footer from "@/components/ui/Footer.vue";
import { useStore } from "@/store/main";
import MainArea from "@/components/ui/MainArea.vue";

const store = useStore();
</script>
