import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  /*User check in database function */
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    /*Para registrar data del user en database */
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    // async signIn() {
    //   const { user, session, error } = await supabase.auth.signIn({
    //     email: "example@email.com",
    //     password: "example-password",
    //   });
    // },
    // signOut() {},

    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
