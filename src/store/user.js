import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  /*User check (if exists) in database function */
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },

    /*Para registrar data del user en database */
    async signUp(email, password, name) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        name: name,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log("hola");
      }
    },

    // async signIn() {
    //   const { user, session, error } = await supabase.auth.signIn({
    //     email: "example@email.com",
    //     password: "example-password",
    //   });
    // },
    // signOut() {},
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

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
/* async function logOut(){
  const (error)
} */
