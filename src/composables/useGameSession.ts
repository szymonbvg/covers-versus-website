import type { GameSessionContext } from "@/types/game";
import { inject } from "vue";

export function useGameSession() {
  const session = inject<GameSessionContext>("gameSession");
  if (!session) throw new Error("useGameSession used outside the session provider");
  return session;
}
