export interface JobRolesResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': JobRoles[];
  'hydra:totalItems': number;
  'hydra:search': HydraSearch;
}

interface HydraSearch {
  '@type': string;
  'hydra:template': string;
  'hydra:variableRepresentation': string;
  'hydra:mapping': HydraMapping[];
}

interface HydraMapping {
  '@type': string;
  variable: string;
  property: string;
  required: boolean;
}

interface JobRoles {
  '@id': string;
  '@type': string;
  name: string;
  uuid: string;
}
