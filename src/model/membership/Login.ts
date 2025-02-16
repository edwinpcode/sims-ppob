import Response from "../ModelRespone";

export type Login = {
  email: string;
  password: string;
};

export interface LoginResponse extends Response {
  data: {
    token: string;
  };
}
