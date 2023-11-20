import { banksData } from "../../banks-tests/banks-data";
import { currenciesData } from "../../currencies-tests/currencies-data";
import { userProfileData } from "../../user-related-tests/user-data";
import { 
    SavingsAccountModel, SavingsAccountCreateModel, 
    SavingsAccountEditModel, SavingsAccountDeletionResponse 
} from "src/app/models/savings-account.model";

export const createdSavingsAccount: SavingsAccountModel = {
    id: 3, account_name: "Test Savings Account 3", 
    account_balance: '0.00',
    account_owner: userProfileData.user,
    currency: currenciesData[1],
    bank: banksData[0] 
};

export const editedSavingsAccountData: SavingsAccountEditModel = {
    account_name: "Test Savings Account -- edit", 
    account_balance: '200.00',
};

export const newSavingsAccountData: SavingsAccountCreateModel = {
    account_name: "Test Savings Account 3", 
    account_balance: 0.00,
    account_owner: userProfileData.user,
    currency: currenciesData[1],
    bank: banksData[0]
};

export const savingsAccountDeletionResponse: SavingsAccountDeletionResponse = {
    id: 2,
    message: "Account successfully deleted!"
}

export const savingsAccountsData: SavingsAccountModel[] = [
    { 
        id: 1, account_name: "Test Savings Account 1", 
        account_balance: '0.00',
        account_owner: userProfileData.user,
        currency: currenciesData[0],
        bank: banksData[0] 
    },
    { 
        id: 2, account_name: "Test Savings Account 2", 
        account_balance: '0.00',
        account_owner: userProfileData.user,
        currency: currenciesData[1],
        bank: banksData[0] 
    }
];

export const savingsAccountsPostDeletionData: SavingsAccountModel[] = [
    savingsAccountsData[0]
];