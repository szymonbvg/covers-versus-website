<template>
  <div class="overlay" @click="handleClick">
    <div class="dialog-content">
      <div class="dialog-titlebar">
        <div class="title">
          <p>{{ props.title }}</p>
        </div>
        <img v-if="closeable" src="@/assets/close.svg" @click="handleClick" />
      </div>
      <div class="input-content">
        <input
          v-model="inputValue"
          type="text"
          :placeholder="props.placeholder"
          @keyup.enter="handleEmit(isInputValid, 'confirm', inputValue)"
        />
        <button :disabled="!isInputValid" @click="handleEmit(isInputValid, 'confirm', inputValue)">
          {{ props.buttonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    closeable?: boolean;
    inputRegExp?: RegExp;
    title: string;
    placeholder: string;
    buttonLabel: string;
  }>(),
  {
    validationRegExp: undefined,
    closeable: true,
  }
);
const emit = defineEmits(["confirm", "close"]);

const inputValue = ref("");

const isInputValid = computed(() => {
  if (!props.inputRegExp) return true;
  return props.inputRegExp.test(inputValue.value);
});

const handleClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleEmit(props.closeable, "close");
  }
};

const handleEmit = (condition: boolean, event: "confirm" | "close", ...args: unknown[]) => {
  if (!condition) return;
  emit(event, ...args);
};
</script>

<style scoped>
.overlay {
  z-index: 99;
}

.dialog-content {
  width: 70vw;
  max-width: 550px;
  height: 60vh;
  max-height: 290px;
  border: 1px solid #3f704d;
  border-radius: 8px;
  background-color: #43403e;
  box-shadow: 10px 10px #1b1a18;
  overflow: hidden;
}

.dialog-titlebar {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #302e2d;
}

.title {
  width: 100%;
  overflow: hidden;
  margin: 0 15px;
}
.title p {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dialog-content,
.input-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.input-content {
  margin: 15px;
  gap: 15px;
}

button {
  flex: 1;
  font-size: 16px;
}

input {
  flex: 1;
  padding: 0 20px;
  font-size: 23px;
  font-weight: bold;
}

img {
  margin-left: auto;
  padding: 12px;
  background-color: #3f704d;
}
img:hover {
  background-color: #568203;
}
img:active {
  background-color: #74c365;
}
</style>
