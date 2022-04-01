<template>
  <h2 class="font-bold text-fuchsia">👇 Update your User Info below 👇</h2>
  <input
    type="email"
    class="
      block
      m-auto
      appearance-none
      bg-white
      border border-grey-light
      hover:border-grey
      py-2
      rounded
      shadow
      w-2/5
      mt-4
      mb-2
      text-center
    "
    placeholder="Insert your new e-mail"
    v-model="email"
  />
  <a
    @click="handleUpdateUser({ email: email })"
    href="#"
    class="btn-black font-bold flex-col mt-2 hover:text-fuchsia hover:font-bold"
    tabindex="0"
  >
    Update Email
  </a>
  <input
    type="password"
    class="
      block
      m-auto
      appearance-none
      bg-white
      border border-grey-light
      hover:border-grey
      py-2
      rounded
      shadow
      w-2/5
      mt-2
      mb-2
      text-center
    "
    placeholder="Insert your new password"
    v-model="password"
  />
  <a
    @click="UpdateUser({ password: password })"
    href="#"
    class="btn-black font-bold flex-col hover:text-fuchsia hover:font-bold"
    tabindex="0"
  >
    Update password
  </a>
  <LogOut />
</template>

<script setup>
import { useUserStore } from "../store/user";
import { Session, Provider } from "@supabase/gotrue-js/dist/main/lib/types";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import router from "../router";
import LogOut from "../components/LogOut.vue";
//Credentials Update function
async function UpdateUser(credentials) {
  try {
    const { error } = await supabase.auth.update(credentials);
    if (error) {
      alert("Error updating user info: " + error.message);
    } else {
      alert("Successfully updated user info!");
      window.location.href = "/";
    }
  } catch (error) {
    alert("Error updating user info: " + error.message);
  }
}
</script>