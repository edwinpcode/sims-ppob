import ModelResponse from "../ModelRespone";
import { Profile } from "./Profile";

export interface ProfileImageResponse extends ModelResponse {
  data: Profile;
}
