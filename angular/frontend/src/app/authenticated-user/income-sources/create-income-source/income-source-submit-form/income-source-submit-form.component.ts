import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { 
  IncomeSourceCreateAndEditModel 
} from 'src/app/models/income-source.model';
import { 
  IncomeSourceAddedCancelled, IncomeSourceSubmitted 
} from '../../income-sources.actions';

@Component({
  selector: 'app-income-source-submit-form',
  templateUrl: './income-source-submit-form.component.html',
  styleUrls: ['./income-source-submit-form.component.css']
})
export class IncomeSourceSubmitFormComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitIncomeSource(form: NgForm) {
    if (form.invalid) {
      this.store.dispatch(new IncomeSourceAddedCancelled({err: {
        error: {
          Error: "The form values were not properly filled in!"
        }
      }} ));
      return;
    }
    const data: IncomeSourceCreateAndEditModel = {
      income_source_name: form.value.income_source_name,
    };
    this.store.dispatch(
      new IncomeSourceSubmitted({ incomeSource: data })
      );
    form.reset();
  };

}
