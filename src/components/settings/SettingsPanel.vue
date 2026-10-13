<template>
  <div class="settings">
    <div class="label">
      <p>Game Settings:</p>
    </div>
    <SettingControl
      v-if="!props.summary"
      v-for="definition in GAME_SETTING_DEFINITIONS"
      :definition="definition"
      :key="definition.key"
    />
    <div
      v-else
      v-for="definition in GAME_SETTING_DEFINITIONS"
      class="summary"
      :key="`${definition.key}-summary`"
    >
      <div>
        <span>{{ definition.label }}:</span>
        <span class="value">{{ settings.getFormattedValue(definition.key) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/store/settings.ts";
import SettingControl from "./SettingControl.vue";
import { GAME_SETTING_DEFINITIONS } from "./settings.definitions";

const props = withDefaults(defineProps<{ summary?: boolean }>(), {
  summary: false,
});

const settings = useSettings();
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.label {
  display: flex;
  width: 100%;
}

.label p {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

.summary {
  display: flex;
  align-items: center;
  background-color: #43403e;
  border-radius: 8px;
  width: 100%;
  min-height: 50px;
  box-shadow: 8px 8px #1b1a18;
  box-sizing: border-box;
}

.summary div {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: 0 15px;
}

.summary .value {
  margin-left: auto;
  font-weight: bold;
}
</style>
