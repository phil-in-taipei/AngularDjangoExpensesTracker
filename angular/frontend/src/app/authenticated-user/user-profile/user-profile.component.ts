import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { UserProfileMessagesCleared } from '../user.actions';
import { 
  selectUserProfile, userProfileSubmissionErrorMsg, 
  userProfileSubmissionSuccessMsg } from './../user.selectors';
import { UserProfileModel } from '../../models/user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  showForm:boolean = false;
  userProfileSubmitErrMsg$: Observable<string | undefined>;
  userProfileSubmitSuccessMsg$: Observable<string | undefined>;
  usrProfile$: Observable<UserProfileModel|undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log('initializing the profile component now...')
    this.store.dispatch(new UserProfileMessagesCleared());
    this.usrProfile$ = this.store.pipe(select(selectUserProfile));
    this.userProfileSubmitErrMsg$ = this.store.pipe(
      select(userProfileSubmissionErrorMsg)
    );
    this.userProfileSubmitSuccessMsg$ = this.store.pipe(
      select(userProfileSubmissionSuccessMsg)
    );
  }

  toggleForm() {
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  closeFormHander($event: boolean) {
    this.showForm = $event;
  };

  onClearStatusMsgs() {
    this.store.dispatch(new UserProfileMessagesCleared());
  }
}
