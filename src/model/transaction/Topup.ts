import ModelResponse from "../ModelRespone";

export type Topup = {
  top_up_amount: number;
};

export interface TopupRespone extends ModelResponse {
  data: {
    balance: number;
  };
}
