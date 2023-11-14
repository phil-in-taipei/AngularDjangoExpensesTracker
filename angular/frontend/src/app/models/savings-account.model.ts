import { BankModel } from "./bank.model";
import { CurrencyModel } from "./currency.model";
import { UserModel } from "./user-profile.model";

export interface SavingsAccountCreateModel {
  bank: BankModel,
  account_name: string;
  account_owner: UserModel;
  account_balance: number;
  currency: CurrencyModel;
}

export interface SavingsAccountDeletionResponse {
  id: number;
  message: string;
}

export interface SavingsAccountEditModel {
  account_name: string;
  account_balance: number;
}

export interface SavingsAccountModel {
    id: number;
    bank: BankModel,
    account_name: string;
    account_owner: UserModel;
    account_balance: string;
    currency: CurrencyModel;
}

