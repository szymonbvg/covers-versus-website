import { defineStore } from "pinia";

type MainStoreState = {
  username: string | null;
  token?: string;
};

export const useStore = defineStore("main", {
  state: (): MainStoreState => ({
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token") ?? undefined,
  }),

  actions: {
    updateUsername(newUsername: string) {
      this.username = newUsername;
      localStorage.setItem("username", newUsername);
    },

    updateToken(newToken?: string) {
      this.token = newToken;
      if (!newToken) {
        localStorage.removeItem("token");
        return;
      }
      localStorage.setItem("token", newToken);
    },
  },
});
