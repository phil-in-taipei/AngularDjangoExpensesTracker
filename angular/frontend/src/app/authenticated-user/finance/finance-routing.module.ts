import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { SavingsAccountsComponent } from './savings-accounts/savings-accounts.component';

const routes: Routes = [
  { path: '', component: FinanceComponent, children: [ 
      { path: 'savings-accounts', component: SavingsAccountsComponent }, 
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
