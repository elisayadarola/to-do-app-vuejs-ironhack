<template>
  <div>
    <section>
      <div>
        <h2 class="font-serif text-2xl lg:text-3xl text-black text-center">
          Sign In
        </h2>

        <p class="font-sans text-sm text-gray-special text-center mt-2">
          ⭐ Welcome to your favorite task app! ⭐
        </p>

        <form @submit.prevent="login">
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
            placeholder="Insert your password"
            v-model="password"
          />
          <div v-if="errorMsg">
            <p>{{ errorMsg }}</p>
          </div>
          <button
            class="
              block
              mb-12
              bg-gray-special
              rounded
              p-3
              font-sans
              text-sm text-gray-200
            "
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p class="dontHave">
          Don't have an account? <br />
          <Routing :route="route" :buttonText="buttonText" />
        </p>
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

// import Routing from "../components/Routing.vue";

const route = "/auth/sign-up";
const buttonText = "Sign Up";
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();

/*Función para error de credenciales incorrectas */
const login = async () => {
  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push("/");
  } catch (error) {
    console.log("hola");
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style scoped>
button {
  background-color: pink;
  color: white;
  font-weight: bold;
  font-family: Georgia, "Times New Roman", Times, serif;
  width: 40%;
  margin-left: 30%;
}
* {
  text-align: center;
}
button:hover {
  border: solid rgb(226, 43, 195);
  color: rgb(226, 43, 195);
  background-color: white;
}
.dontHave:hover {
  color: white;
  background-color: rgb(226, 43, 195);
  width: 250px;
  margin-left: 40%;
  font-weight: bold;
  border-radius: 10px;
}
</style>