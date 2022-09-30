<template>
  <strong class="block q-mb-lg">Register Page</strong>

  <RegisterForm />

  <router-link :to="{ name: 'LoginPage' }" class="q-mt-lg block">
    Already have an account? Click here to login
  </router-link>
</template>

<script setup lang="ts">
import RegisterForm from '../../../components/RegisterForm/RegisterForm.vue';
</script>
