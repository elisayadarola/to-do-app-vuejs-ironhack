<template>
  <h2 class="underline font-bold text-pink-600">
    👇 Update your User Info below 👇
  </h2>
  <input
    type="email"
    class="
      block
      appearance-none
      bg-white
      border border-grey-light
      hover:border-grey
      py-2
      rounded
      shadow
      w-2/5
    "
    placeholder="Insert your new e-mail"
    v-model="email"
  />
  <a
    @click="handleUpdateUser({ email: email })"
    href="#"
    class="btn-black font-bold flex"
    tabindex="0"
  >
    Update Email
  </a>
  <input
    type="password"
    class="
      block
      appearance-none
      bg-white
      border border-grey-light
      hover:border-grey
      py-2
      rounded
      shadow
      w-2/5
    "
    placeholder="Insert your new password"
    v-model="password"
  />
  <a
    @click="UpdateUser({ password: password })"
    href="#"
    class="btn-black font-bold flex"
    tabindex="0"
  >
    Update password
  </a>
</template>

<script setup>
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

<style scoped>
</style>