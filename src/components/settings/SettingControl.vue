<template>
  <div class="control">
    <label :for="`setting-${definition.key}`">
      <span>{{ definition.label }}</span>
      <input
        v-if="definition.type !== SettingControlType.SELECT"
        :id="`setting-${definition.key}`"
        :type="definition.type"
        :value="settings[definition.key]"
        @change="handleInputChange"
      />
      <select v-else @change="handleSelectChange" :value="settings[definition.key]">
        <option v-for="(optionLabel, key) in definition.options" :value="key" :key="key">
          {{ optionLabel }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/store/settings";
import { SettingControlType, type GameSettingDefinition } from "@/types/game";
import { computed } from "vue";

const { definition } = defineProps<{ definition: GameSettingDefinition }>();
const settings = useSettings();

const range = computed(() => ({
  min: definition.type === SettingControlType.NUMBER ? definition.minValue : undefined,
  max: definition.type === SettingControlType.NUMBER ? definition.maxValue : undefined,
}));

const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value: number | boolean = 0;

  if (target.type === SettingControlType.CHECKBOX) value = target.checked;
  else if (target.type === SettingControlType.NUMBER) value = Number(target.value) || 0;

  settings.updateSetting(definition.key, value, range.value.min, range.value.max);

  if (target.type === SettingControlType.NUMBER && definition.type === SettingControlType.NUMBER) {
    target.value = `${settings[definition.key]}`;
  }
};

const handleSelectChange = (event: Event) => {
  const { value } = event.target as HTMLSelectElement;
  if (definition.type !== SettingControlType.SELECT || !definition.options[value]) return;

  settings.updateSetting(definition.key, value);
};
</script>

<style scoped>
.control {
  display: flex;
  align-items: center;
  background-color: #43403e;
  border-radius: 8px;
  width: 100%;
  min-height: 50px;
  box-shadow: 8px 8px #1b1a18;
}

.control label {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}

.control input,
.control select {
  width: 80px;
  margin-left: auto;
}
.control select {
  display: flex;
  align-items: center;
  width: 92px !important;
  height: 29px;
}
</style>
