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
import { UserEffects } from './user.effects';
import { userProfileReducer } from './user.reducers';
import { EditProfileFormComponent } from './user-profile/edit-profile-form/edit-profile-form.component';
import { IncomeSourcesComponent } from './income-sources/income-sources.component';
import { CreateIncomeSourceComponent } from './income-sources/create-income-source/create-income-source.component';
import { IncomeSourceSubmitFormComponent } from './income-sources/create-income-source/income-source-submit-form/income-source-submit-form.component';

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
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticatedUserRoutingModule,
    StoreModule.forFeature('banks', banksReducer),
    StoreModule.forFeature('currencies', currenciesReducer),
    StoreModule.forFeature('user', userProfileReducer),
    EffectsModule.forFeature([BanksEffects]),
    EffectsModule.forFeature([CurrenciesEffects]),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class AuthenticatedUserModule { }
