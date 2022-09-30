<template>
  <div v-if="step === 1" class="form-group">
    <Step1Form @submit="onStep1Submit" />
  </div>

  <div v-else>
    <Step2Form @submit="onStep2Submit" />
  </div>
</template>

<script lang="ts" setup>
import { register } from 'src/api/auth';
import { ref } from 'vue';
import Step1Form from './Step1Form.vue';
import Step2Form from './Step2Form.vue';
import { Step1FormValues, Step2FormValues } from './types';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const step = ref(1);
const step1FormValues = ref<Step1FormValues>();
const router = useRouter();

const onStep1Submit = (formValues: Step1FormValues) => {
  step1FormValues.value = formValues;
  step.value++;
};

const onStep2Submit = async (form2: Step2FormValues) => {
  const form1 = step1FormValues.value;

  const registrationForm = {
    email: form1?.email,
    password: form1?.password,
    firstName: form1?.firstname,
    lastName: form1?.lastname,
    countryCode: form1?.country?.value,
    jobRole: form2.jobRole?.value,
    membership: {
      company: {
        name: form2.companyName,
        size: form2.companySize?.value,
      },
      permission: 'viewer',
    },
  };

  const result = await register(registrationForm);

  if (result.data) {
    $q.notify('Thank you for registering.');

    router.push({
      name: 'VerifyPage',
    });

    localStorage.setItem('registerUuid', result.data.uuid);
  }
};
</script>

<style lang="scss" scoped>
.register {
  margin-bottom: 15px;
}
</style>
