<template>
  <!-- <SignUp v-if="component"/>
<SignIn v-else/> -->
  <div>
    <router-view></router-view>
  </div>
  <!-- 
<div class="button-signup">   
    
    <p class="font-sans text-sm text-gray-special text-center" v-if="component">Already have an account?</p>
    <p class="font-sans text-sm text-gray-special text-center" v-else>Don't have an account? </p> <br>
    <button @click="changeComponent" v-if="component">Click to Sign In</button>
    <button @click="changeComponent" v-else>Click to Sign Up</button>
    
</div> -->
</template>
<script setup>
// import { ref } from "vue";
// import router from "../router";
// import SignIn from '../components/SignIn.vue';
// import SignUp from '../components/SignUp.vue';

// const component = ref(false);
// function changeComponent(){
//     component.value = !component.value;
// }
</script>

<style scoped>
/* * {
  background-color: white;
}
h2 {
  font-weight: bold;
  font-size: larger;
  border: solid black;
}
p {
  font-weight: bold;
  font-size: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
} */
/* button {
  color: rgb(238, 238, 247);
  background-color: rgb(226, 43, 195);
  border-radius: 5px;
  width: 140px;
  padding: 5px;
  margin-bottom: 20px;
  font-weight: bold;
} */
</style>