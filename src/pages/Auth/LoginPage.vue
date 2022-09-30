<template>
  <div>
    <div class="q-mb-lg">Login Page</div>

    <q-form @submit="onSubmit" class="q-gutter-md form">
      <q-input
        outlined
        dense
        v-model="formValues.email"
        label="Your email"
        type="email"
        lazy-rules
        :rules="[requiredInput]"
      />

      <q-input
        outlined
        dense
        type="password"
        v-model="formValues.password"
        label="Your password"
        lazy-rules
        :rules="[requiredInput]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

    <router-link :to="{ name: 'RegisterPage' }" class="q-mt-lg block">
      Don't have an account? Click here to register
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { login } from 'src/api/auth';
import { api } from 'src/boot/axios';
import { requiredInput } from 'src/utils/form';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface LoginFormValues {
  email: string;
  password: string;
}

const formValues = ref<LoginFormValues>({
  email: '',
  password: '',
});

const $q = useQuasar();
const router = useRouter();

const onSubmit = async () => {
  const { email, password } = formValues.value;

  try {
    const { data } = await login({
      email,
      password,
    });

    if (data && data.refresh_token && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refresh_token', data.refresh_token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      router.push({
        name: 'UserDashboardPage',
      });
    }
  } catch (e) {
    console.error(e);

    $q.notify({
      color: 'negative',
      message: 'Wrong email or password',
    });
  }
};
</script>

<style scoped>
.form {
  min-width: 350px;
}
</style>
