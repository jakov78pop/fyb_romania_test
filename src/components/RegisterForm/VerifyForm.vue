<template>
  <div>
    <div class="q-mb-lg">Please confirm your email address</div>

    <div v-if="!shouldShowForm">
      <p>
        You should have received an email with a link to confirm your account.
        Please click the link you received to finish your subscription
      </p>

      <p>Didn't receive the email? <a href="#">Resend Now</a></p>
    </div>

    <q-form v-if="shouldShowForm" @submit="onSubmit" class="q-gutter-md form">
      <q-input
        outlined
        dense
        v-model="formValues.token"
        label="Please enter the received token"
        lazy-rules
        :rules="[requiredInput]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { verifyAccount } from 'src/api/auth';
import { requiredInput } from 'src/utils/form';
import { ref, defineEmits, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export interface VerifyFormValues {
  token: string;
}

const emit = defineEmits<{
  (e: 'submit', form: VerifyFormValues): void;
}>();

const formValues = ref<VerifyFormValues>({
  token: '',
});

const $q = useQuasar();

/**
 * In case something went wrong, we can let user input manually.
 * ¯\_(ツ)_/¯ We might need it in the future, who knows
 */
const shouldShowForm = ref(false);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const tokenFromUrl = route.query.token;
  const uuidFromUrl = route.query.uuid;

  if (tokenFromUrl && uuidFromUrl) {
    const { data } = await verifyAccount(
      String(uuidFromUrl),
      String(tokenFromUrl)
    );

    if (data) {
      router.push({
        name: 'LoginPage',
      });
      $q.notify('Thank you for verifying!');
    }
  } else {
    shouldShowForm.value = true;
  }
});

const onSubmit = () => {
  emit('submit', formValues.value);
};
</script>

<style scoped>
.form {
  min-width: 350px;
}
</style>
