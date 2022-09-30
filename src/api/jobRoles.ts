import { api } from 'src/boot/axios';
import { JobRolesResponse } from './jobRoles.types';

export const getJobRoles = () => {
  return api.get<JobRolesResponse>('/job_roles');
};
