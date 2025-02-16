import ModelResponse from "../ModelRespone";

export type Transaction = {
  service_code: string;
};

export interface TransactionResponse extends ModelResponse {
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: 10000;
    created_on: string;
  };
}
