import ModelResponse from "../ModelRespone";

export type Record = {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
};

export type TransactionHistory = {
  offset: number;
  limit: number;
};

export interface TransactionHistoryResponse extends ModelResponse {
  data: {
    offset: number;
    limit: number;
    records: Array<Record>;
  };
}
