import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthenticatedUserRoutingModule } from './authenticated-user-routing.module';
import { AuthenticatedUserComponent } from './authenticated-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthenticatedHeaderComponent } from './authenticated-layout/authenticated-header/authenticated-header.component';
import { AuthenticatedFooterComponent } from './authenticated-layout/authenticated-footer/authenticated-footer.component';
import { BanksEffects } from './banks/banks.effects';
import { banksReducer } from './banks/banks.reducers';
import { CurrenciesEffects } from './currencies/currencies.effects';
import { currenciesReducer } from './currencies/currencies.reducers';
import { IncomeSourcesEffects } from './income-sources/income-sources.effects';
import { incomeSourcesReducer } from './income-sources/income-sources.reducers';
import { UserEffects } from './user.effects';
import { userProfileReducer } from './user.reducers';
import { EditProfileFormComponent } from './user-profile/edit-profile-form/edit-profile-form.component';
import { IncomeSourcesComponent } from './income-sources/income-sources-list/income-sources.component';
import { CreateIncomeSourceComponent } from './income-sources/create-income-source/create-income-source.component';
import { IncomeSourceSubmitFormComponent } from './income-sources/create-income-source/income-source-submit-form/income-source-submit-form.component';
import { SingleIncomeSourceComponent } from './income-sources/income-sources-list/single-income-source/single-income-source.component';
import { EditIncomeSourceComponent } from './income-sources/edit-income-source/edit-income-source.component';
import { EditIncomeSourceFormComponent } from './income-sources/edit-income-source/edit-income-source-form/edit-income-source-form.component';

@NgModule({
  declarations: [
    AuthenticatedUserComponent,
    UserProfileComponent,
    AuthenticatedHeaderComponent,
    AuthenticatedFooterComponent,
    EditProfileFormComponent,
    IncomeSourcesComponent,
    CreateIncomeSourceComponent,
    IncomeSourceSubmitFormComponent,
    SingleIncomeSourceComponent,
    EditIncomeSourceComponent,
    EditIncomeSourceFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticatedUserRoutingModule,
    StoreModule.forFeature('banks', banksReducer),
    StoreModule.forFeature('currencies', currenciesReducer),
    StoreModule.forFeature('income', incomeSourcesReducer),
    StoreModule.forFeature('user', userProfileReducer),
    EffectsModule.forFeature([BanksEffects]),
    EffectsModule.forFeature([CurrenciesEffects]),
    EffectsModule.forFeature([IncomeSourcesEffects]),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class AuthenticatedUserModule { }
