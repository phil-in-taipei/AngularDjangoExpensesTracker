import { banksData } from "../../banks-tests/banks-data";
import { currenciesData } from "../../currencies-tests/currencies-data";
import { userProfileData } from "../../user-related-tests/user-data";
import { SavingsAccountModel } from "src/app/models/savings-account.model";

export const savingsAccountsData: SavingsAccountModel[] = [
    { 
        id: 1, account_name: "Test Savings Account 1", 
        account_balance: 0.00,
        account_owner: userProfileData.user,
        currency: currenciesData[0],
        bank: banksData[0] 
    },
    { 
        id: 2, account_name: "Test Savings Account 2", 
        account_balance: 0.00,
        account_owner: userProfileData.user,
        currency: currenciesData[1],
        bank: banksData[1] 
    }
]