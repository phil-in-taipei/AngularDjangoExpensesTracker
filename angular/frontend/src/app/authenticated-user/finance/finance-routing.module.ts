import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { 
  CreateAccountComponent 
} from './savings-accounts/create-account/create-account.component';
import { 
  CreateDepositComponent 
} from './transactions/deposits/create-deposit/create-deposit.component';
import { 
  CreateWithdrawalComponent 
} from './transactions/withdrawals/create-withdrawal/create-withdrawal.component';
import { 
  DepositsListComponent 
} from './transactions/deposits/deposits-list/deposits-list.component';
import { 
  EditAccountComponent 
} from './savings-accounts/edit-account/edit-account.component';
import { 
  SavingsAccountsComponent 
} from './savings-accounts/savings-accounts-list/savings-accounts.component';

const routes: Routes = [
  { path: '', component: FinanceComponent, children: [ 
      { path: 'savings-accounts', component: SavingsAccountsComponent },
      { path: 'edit-account/:id', component: EditAccountComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'create-deposit', component: CreateDepositComponent },
      { path: 'create-withdrawal', component: CreateWithdrawalComponent },
      { path: 'monthly-deposits', component: DepositsListComponent },
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
