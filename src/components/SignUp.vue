<template>
  <!--SignUp section -->
  <div class="signUp">
    <section>
      <h2
        class="mt-7 mb-7 font-serif text-2xl lg:text-3xl text-black text-center"
      >
        Sign Up
      </h2>
      <p class="font-sans text-sm text-gray-special text-center mt-2">
        💅 This is where your life becomes productive 💅
      </p>
      <form @submit.prevent="signUp" class="mt-7 space-y-5 mb-5">
        <div>
          <div>
            <label
              class="
                block
                mb-1
                font-sans
                text-sm text-gray-special
                mb-2
                mt-2
                font-bold
              "
              >Name</label
            >
            <input
              class="border border-gray-special/50 rounded p-2 w-2/5"
              type="text"
              v-model="name"
            />
          </div>

          <div>
            <label
              class="
                block
                mb-1
                font-sans
                text-sm text-gray-special
                mt-2
                mb-2
                font-bold
              "
              >Email</label
            >
            <input
              class="border border-grey-special/50 rounded p-2 w-2/5"
              id="email"
              type="email"
              name="email"
              required
              v-model="email"
            />
          </div>

          <div>
            <label
              class="
                block
                mb-1
                font-sans
                text-sm text-gray-special
                mt-2
                mb-2
                font-bold
              "
              >Password</label
            >
            <input
              class="w-2/5 border border-gray-special/50 rounded p-2 mt-2 mb-2"
              id="password"
              name="password"
              type="password"
              required
              v-model="password"
            />
          </div>

          <div>
            <label
              for="ConfirmPassword"
              class="block mb-1 font-sans text-sm text-gray-special font-bold"
              >Confirm password</label
            >
            <input
              class="mb-7 w-2/5 border border-gray-special/50 rounded p-2"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              v-model="confirmPassword"
            />
          </div>

          <!--para el mensaje de error -->
          <div v-if="errorMsg">
            <p class="text-red-500">{{ errorMsg }}</p>
          </div>

          <button
            class="
              text-white
              font-bold
              w-24
              bg-fuchsia
              mb-12
              rounded
              p-3
              font-sans
              text-sm text-white
              hover:border-fuchsia hover:
              border-solid
              hover:
              border-2
            "
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p class="italic mb-4">
        Already have an account?
        <!--aqui me faltaba colocar el routing dentro del <p>-->
      </p>
      <span class="dontHave mb-2">
        <Routing :route="route" :buttonText="buttonText"
      /></span>
      <!-- <Routing :route="route" :buttonText="buttonText" /> -->
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import Routing from "../components/Routing.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
/*aqui la ruta './components/Routing.vue no funcionaba y tampoco la que al final si funcionó dspués 
de reiniciar VSCODE e intentar varias rutas*/
/*aqui estaba importando dos routing con path diferentes en sitios diferentes, big mistake*/
const route = "/auth";
const buttonText = "Sign In";
//Para el Auth
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");
const router = useRouter();

async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      router.push({ path: "/" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  } else {
    errorMsg.value = "Warning:Passwords do not match";
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
/*const register = async () => {
  console.log(email.value);
  console.log(password.value);
  if (password.value === confirmPassword.value) {
    try {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        name: name.value,
      });
      if (error) throw error;
      router.push("/auth");
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  } else {
    errorMsg.value = "Try again! Passwords must be a match.";
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};*/
</script>

<style scoped>
* {
  text-align: center;
}
h2 {
  color: rgb(226, 43, 195);
}
.dontHave:hover {
  color: rgb(226, 43, 195);
  font-weight: bold;
  border-radius: 10px;
}
</style>
