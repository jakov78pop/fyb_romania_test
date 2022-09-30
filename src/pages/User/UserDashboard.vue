<template>
  <q-page padding>
    User Dashboard

    <pre>
      {{ JSON.stringify(userProfile, null, 2) }}
    </pre>

    <q-btn color="warning" @click="logout"> Logout </q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { getUserProfile } from 'src/api/me';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userProfile = ref();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  router.push({
    name: 'LoginPage',
  });
};

onMounted(async () => {
  const { data } = await getUserProfile();
  userProfile.value = data;
});
</script>
