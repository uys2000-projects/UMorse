import type { User } from "firebase/auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      id: "",
    };
  },
  getters: {
    isAuthenticated: (state) => state.id != "",
  },
  actions: {
    setUser(user: User) {
      this.id = user.uid;
    },
    removeUser() {
      this.id = "";
    },
  },
});
