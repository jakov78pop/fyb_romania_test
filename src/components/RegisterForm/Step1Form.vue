<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      outlined
      dense
      v-model="formValues.email"
      label="Email*"
      lazy-rules
      :rules="[requiredInput]"
      type="email"
    />

    <q-input
      outlined
      dense
      v-model="formValues.firstname"
      label="Your name*"
      hint="Name and surname"
      lazy-rules
      :rules="[requiredInput]"
    />

    <q-input
      outlined
      dense
      v-model="formValues.lastname"
      label="Last name*"
      lazy-rules
      :rules="[requiredInput]"
    />

    <q-select
      dense
      outlined
      v-model="formValues.country"
      use-input
      input-debounce="0"
      label="Country"
      :options="countryOptions"
      behavior="menu"
      @filter="filterCountries"
      class="input"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-input
      outlined
      dense
      v-model="formValues.password"
      label="Password"
      type="password"
      lazy-rules
      :rules="[requiredInput, passwordMatch]"
    />

    <q-input
      outlined
      dense
      v-model="formValues.confirmationPassword"
      label="Confirm password"
      type="password"
      lazy-rules
      :rules="[requiredInput, passwordMatch]"
    />
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { QSelect, QForm } from 'quasar';
import countriesList from './countries.json';
import { createSimpleFilter } from 'src/utils/form/form';
import { Step1FormValues } from './types';
import { requiredInput } from 'src/utils/form';

const initialFormValues: Step1FormValues = {
  firstname: '',
  lastname: '',
  confirmationPassword: '',
  country: null,
  password: '',
  email: '',
};

const emit = defineEmits<{
  (e: 'submit', form: Step1FormValues): void;
}>();

const countryOptions = ref(countriesList);
const formValues = ref<Step1FormValues>({ ...initialFormValues });
const filterCountries = createSimpleFilter(countryOptions, countriesList);

const onSubmit = () => {
  emit('submit', formValues.value);
};

const onReset = () => {
  formValues.value = { ...initialFormValues };
};

const passwordMatch = () => {
  if (formValues.value.password && formValues.value.confirmationPassword) {
    if (formValues.value.password !== formValues.value.confirmationPassword) {
      return 'Passwords are not matched';
    }
  }
  return true;
};
</script>

<style scoped lang="scss">
.input {
  width: 300px;
  max-width: 100%;
}
</style>
