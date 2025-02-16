import ModelResponse from "../ModelRespone";
import { Profile } from "./Profile";

export type ProfileUpdate = {
  first_name: string;
  last_name: string;
};

export interface ProfileUpdateResponse extends ModelResponse {
  data: Profile;
}
