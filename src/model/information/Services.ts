import ModelResponse from "../ModelRespone";

export type Service = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export interface ServiceRespone extends ModelResponse {
  data: Array<Service>;
}
