import type { Ref } from "vue";
import type { WSError, WSMessage } from "./websocket";

export type GameSettings = {
  maxPlayers: number;
  rounds: number;
  roundTimeSeconds: number;
  difficulty: string;
  isPrivate: boolean;
};

export enum SettingControlType {
  CHECKBOX = "checkbox",
  NUMBER = "number",
  SELECT = "select",
}

export type GameSettingDefinition = {
  key: keyof GameSettings;
  label: string;
} & (
  | {
      type: SettingControlType.CHECKBOX;
    }
  | {
      type: SettingControlType.NUMBER;
      minValue?: number;
      maxValue?: number;
    }
  | {
      type: SettingControlType.SELECT;
      options: Record<string, string>;
    }
);

export type LobbyData = {
  lobbyName: string;
  isPrivate: boolean;
};

export type GameSessionContext = {
  isWebSocketReady: Ref<boolean>;
  data: GameData;
  send: (message: WSMessage) => void;
};

export enum GameState {
  NONE,
  IN_LOBBY,
  STARTING,
  ROUND_RUNNING,
  ROUND_SUMMARY,
}

export type GameData = BaseGameData & {
  players: string[];
  gameState: GameState;
  isInLobby: boolean;
  errorCode?: WSError;
  coverId?: string;
  correctTitle?: string;
  lives: number;
  roundGuessHistory: { value: string; hasGuessed: boolean }[];
  guessedCategories: Record<number, unknown>;
  ranking?: GameRanking;
  isFinalRound: boolean;
  readyPlayers?: Set<string>;
  roundFinishedCount: number;
  waitingForGuessResult: boolean;
  clientTimeOnJoin: number;
  roundEndTime?: number;
  syncTime?: {
    client: number;
    server: number;
  };
};

export type BaseGameData = {
  lobbyName?: string;
  lobbyCode?: string;
  hasAdminAccess: boolean;
};

export type AutocompletionTitle = {
  id: number;
  label: string;
};

export type GamedleAutocompletion = Omit<AutocompletionTitle, "id"> & {
  value: number;
  [key: string]: unknown;
};

export enum RoundActionType {
  SKIP = "skip",
  GUESS = "guess",
}

export type GameRanking = {
  [userId: number]: {
    username: string;
    totalScore: number;
    lastRound: {
      [attempt: number]: {
        action: RoundActionType;
        guessResult?: number[];
      };
    };
  };
};

export enum GuessCategory {
  GAME,
  FRANCHISE,
  DEVELOPER,
  PUBLISHER,
  RELEASE_YEAR,
  THEME,
  GENRE,
}
