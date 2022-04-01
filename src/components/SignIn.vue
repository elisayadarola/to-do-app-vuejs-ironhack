<template>
  <div>
    <section>
      <div>
        <h2
          class="font-serif mt-6 text-2xl lg:text-3xl text-fuchsia text-center"
        >
          Sign In
        </h2>

        <p class="font-sans text-sm text-gray-special text-center mt-2">
          ✨ Welcome to your favorite task app!✨
        </p>
        <!--submit.prevent sirve para que la página no haga reload cuando hacemos click-->
        <form @submit.prevent="signIn">
          <label
            class="
              block
              mb-1
              font-sans
              text-sm text-gray-special
              mt-4
              font-bold
            "
            >Email</label
          >
          <input
            class="
              border border-grey-special/50
              rounded
              p-2
              w-2/5
              hover:border-fuchsia hover:
              border-solid
              hover:
              border-2
            "
            id="email"
            type="email"
            name="email"
            required
            v-model="email"
            placeholder="Your email goes here"
          />

          <label
            class="
              block
              mb-1
              font-sans
              text-sm text-gray-special
              mt-2
              font-bold
            "
            >Password</label
          >
          <input
            class="
              w-2/5
              border border-gray-special/50
              rounded
              p-2
              mb-6
              hover:border-fuchsia hover:
              border-solid
              hover:
              border-2
            "
            id="password"
            name="password"
            type="password"
            required
            placeholder="And your password here"
            v-model="password"
            @keyup.enter="signIn"
          />

          <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
          </div>
          <br />
          <button
            class="
              text-white
              font-bold
              w-20
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
            Sign In
          </button>
        </form>
        <p class="mb-4">
          <span class="italic mb-2 flex justify-center font-bold text-fuchsia">
            Don't have an account?
          </span>
        </p>
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <span class="dontHave mb-2">
            <Routing :route="route" :buttonText="buttonText"
          /></span>
        </transition>

        <!-- <Routing :route="route" :buttonText="buttonText" /> -->
      </div>
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

// import Routing from "../components/Routing.vue";

const route = "/auth/sign-up";
const buttonText = "Sign Up";
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const userStore = useUserStore();

async function signIn() {
  try {
    await userStore.signIn(email.value, password.value);
    router.push({ path: "/" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}

/*Función para error de credenciales incorrectas */
/*const login = async () => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push("/");
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};*/
</script>

<style scoped>
/* button {
  background-color: pink;
  color: white;
  font-weight: bold;
  font-family: Georgia, "Times New Roman", Times, serif;
  width: 40%;
  margin-left: 30%;
} */
* {
  text-align: center;
}

.dontHave:hover {
  color: rgb(226, 43, 195);
  font-weight: bold;
  border-radius: 10px;
}
a:hover {
  color: rgb(226, 43, 195);
  font-weight: bold;
}
</style>