<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-select
      outlined
      dense
      v-model="formValues.companySize"
      use-input
      input-debounce="0"
      label="Company size"
      :options="companySizes"
      behavior="menu"
      @filter="filterCompanySize"
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
      v-model="formValues.companyName"
      label="Company name*"
      lazy-rules
      :rules="[requiredInput]"
    />

    <q-select
      outlined
      dense
      v-model="formValues.jobRole"
      use-input
      input-debounce="0"
      label="Job Role"
      :options="filteredJobRoleOptions"
      behavior="menu"
      @filter="filterJobRoles"
      class="input"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { getJobRoles } from 'src/api/jobRoles';
import { JobRolesResponse } from 'src/api/jobRoles.types';
import { createSimpleFilter, requiredInput } from 'src/utils/form';
import { computed, onMounted, ref, defineEmits } from 'vue';

import companySizesList from './companySizes';
import { Step2FormValues } from './types';

const emit = defineEmits<{
  (e: 'submit', form: Step2FormValues): void;
}>();

const formValues = ref<Step2FormValues>({
  companySize: null,
  jobRole: null,
  companyName: '',
});
const jobRolesList = ref<JobRolesResponse['hydra:member']>([]);
const jobRoleOptions = computed(() => {
  return jobRolesList.value.map((role) => ({
    label: role.name,
    value: role['@id'],
  }));
});

const companySizes = ref(companySizesList);
const filteredJobRoleOptions = ref(jobRoleOptions.value);
const filterCompanySize = createSimpleFilter(companySizes, companySizesList);
const filterJobRoles = ref<ReturnType<typeof createSimpleFilter>>();

const onSubmit = () => {
  emit('submit', formValues.value);
};

onMounted(async () => {
  const { data } = await getJobRoles();
  jobRolesList.value = data['hydra:member'];

  filterJobRoles.value = createSimpleFilter(
    filteredJobRoleOptions,
    jobRoleOptions.value
  );
});
</script>
