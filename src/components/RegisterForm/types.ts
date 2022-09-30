import { QSelectOption } from 'quasar';

export interface Step1FormValues {
  firstname: string;
  lastname: string;
  country: QSelectOption | null;
  password: string;
  confirmationPassword: string;
  email: string;
}

export interface Step2FormValues {
  companySize: QSelectOption | null;
  jobRole: QSelectOption | null;
  companyName: string;
}
