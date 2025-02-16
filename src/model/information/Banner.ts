import ModelResponse from "../ModelRespone";

export type Banner = {
  banner_name: string;
  banner_image: string;
  description: string;
};

export interface BannerRespone extends ModelResponse {
  data: Array<Banner>;
}
