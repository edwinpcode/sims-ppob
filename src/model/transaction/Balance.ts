import ModelResponse from "../ModelRespone";

export interface BalanceRespone extends ModelResponse {
  data: {
    balance: Number;
  };
}
