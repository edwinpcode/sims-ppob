import { Topup, TopupRespone } from "src/model/transaction/Topup";
import apiPublic from "./ApiPublic";
import {
  Transaction,
  TransactionResponse,
} from "src/model/transaction/Transaction";
import { BalanceRespone } from "src/model/transaction/Balance";
import {
  TransactionHistory,
  TransactionHistoryResponse,
} from "src/model/transaction/TransactionHistory";

export const getBalance = () => {
  return apiPublic.get<BalanceRespone>("/balance");
};

export const postTopup = (data: Topup) => {
  return apiPublic.post<TopupRespone>("/topup", data);
};
export const postTransaction = (data: Transaction) => {
  return apiPublic.post<TransactionResponse>("/transaction", data);
};
export const getTransactionHIstory = ({
  offset,
  limit,
}: TransactionHistory) => {
  return apiPublic.get<TransactionHistoryResponse>(
    `/transaction/history?offset=${offset}&limit=${limit}`
  );
};
