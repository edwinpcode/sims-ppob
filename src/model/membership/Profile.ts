import ModelResponse from "../ModelRespone";

export type Profile = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

export interface ProfileResponse extends ModelResponse {
  data: Profile;
}
