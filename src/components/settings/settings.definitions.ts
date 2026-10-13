import { SettingControlType, type GameSettingDefinition } from "@/types/game";

const MAX_PLAYERS = import.meta.env.VITE_MAX_PLAYERS;
const MAX_ROUNDS = import.meta.env.VITE_MAX_ROUNDS;
const MAX_ROUND_TIME = import.meta.env.VITE_MAX_ROUND_TIME;

export const GAME_SETTING_DEFINITIONS: GameSettingDefinition[] = [
  {
    key: "maxPlayers",
    label: "Max Players",
    type: SettingControlType.NUMBER,
    minValue: 1,
    maxValue: MAX_PLAYERS ? parseInt(MAX_PLAYERS) : 20,
  },
  {
    key: "rounds",
    label: "Rounds",
    type: SettingControlType.NUMBER,
    minValue: 1,
    maxValue: MAX_ROUNDS ? parseInt(MAX_ROUNDS) : 512,
  },
  {
    key: "roundTimeSeconds",
    label: "Round Time (seconds)",
    type: SettingControlType.NUMBER,
    minValue: 15.0,
    maxValue: MAX_ROUND_TIME ? parseInt(MAX_ROUND_TIME) : 300.0,
  },
  {
    key: "difficulty",
    label: "Difficulty",
    type: SettingControlType.SELECT,
    options: {
      [1]: "EASY",
      [2]: "NORMAL",
      [3]: "HARD",
    },
  },
  {
    key: "isPrivate",
    label: "Private Lobby",
    type: SettingControlType.CHECKBOX,
  },
];
