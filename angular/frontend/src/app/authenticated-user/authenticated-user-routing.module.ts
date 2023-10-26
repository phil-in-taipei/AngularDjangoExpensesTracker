import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserComponent } from './authenticated-user.component';
import { CreateIncomeSourceComponent } from './income-sources/create-income-source/create-income-source.component';
import { EditIncomeSourceComponent } from './income-sources/edit-income-source/edit-income-source.component';
import { IncomeSourcesComponent } from './income-sources/income-sources-list/income-sources.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: AuthenticatedUserComponent, children: [ 
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'income-sources', component: IncomeSourcesComponent },
    { path: 'edit-income-source/:id', component: EditIncomeSourceComponent },
    { path: 'create-income-source', component: CreateIncomeSourceComponent },
    { path: 'finance', loadChildren: () => import('./finance/finance.module').then(
        m => m.FinanceModule) 
    },
    { path: 'expenditures', loadChildren: () => import('./spending/spending.module').then(
      m => m.SpendingModule) 
  },
    {
      path: "**",
      redirectTo: '/user-profile'
    }
  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticatedUserRoutingModule { }
