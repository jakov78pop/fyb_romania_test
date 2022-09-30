<template>
  <div class="title">Verify page</div>

  <VerifyForm @submit="onSubmit" />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { verifyAccount } from 'src/api/auth';
import VerifyForm, {
  VerifyFormValues,
} from 'src/components/RegisterForm/VerifyForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();

const onSubmit = async (formValue: VerifyFormValues) => {
  const uuid = localStorage.getItem('registerUuid');
  const { token } = formValue;

  if (!uuid) return console.error('uuid is missing');

  const { data } = await verifyAccount(String(uuid), String(token));

  if (data) {
    router.push({
      name: 'LoginPage',
    });
    $q.notify('Thank you for verifying!');
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 15px;
}
</style>
