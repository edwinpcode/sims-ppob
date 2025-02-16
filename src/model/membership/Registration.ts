import ModelResponse from "../ModelRespone";

export type Registration = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export interface RegistrationResponse extends ModelResponse {}
