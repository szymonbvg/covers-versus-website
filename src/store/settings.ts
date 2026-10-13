import type { GameSettings } from "@/types/game";
import { defineStore } from "pinia";

const DIFFICULTIES = {
  [1]: "EASY",
  [2]: "NORMAL",
  [3]: "HARD",
};

function getInitialState(): GameSettings;
function getInitialState<K extends keyof GameSettings>(key: K): GameSettings[K];
function getInitialState<K extends keyof GameSettings>(key?: K): GameSettings | GameSettings[K] {
  const initialState = {
    maxPlayers: 10,
    rounds: 5,
    roundTimeSeconds: 60,
    difficulty: "2",
    isPrivate: false,
  };
  if (key) return initialState[key];
  return initialState;
}

export const useSettings = defineStore("settings", {
  state: () => getInitialState(),

  getters: {
    getFormattedValue(state) {
      return (key: keyof GameSettings) => {
        const value = state[key];
        if (typeof value === "boolean") return value ? "Yes" : "No";
        if (key === "difficulty" && value in DIFFICULTIES) {
          return DIFFICULTIES[value as keyof typeof DIFFICULTIES];
        }
        return value;
      };
    },
  },

  actions: {
    updateSetting<K extends keyof GameSettings>(key: K, value: GameSettings[K], min?: number, max?: number) {
      let v = value;
      if (typeof v === "number" && ((min && v < min) || (max && v > max))) {
        v = getInitialState(key);
      }
      this.$patch({
        [key]: v,
      });
    },
  },
});
