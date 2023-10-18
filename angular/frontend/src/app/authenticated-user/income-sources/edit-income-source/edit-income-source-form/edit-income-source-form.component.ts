import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store} from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { 
  IncomeSourceCreateAndEditModel, IncomeSourceModel 
} from 'src/app/models/income-source.model';
import { 
  IncomeSourceEditCancelled, IncomeSourceEditSubmitted 
} from '../../income-sources.actions';

@Component({
  selector: 'app-edit-income-source-form',
  templateUrl: './edit-income-source-form.component.html',
  styleUrls: ['./edit-income-source-form.component.css']
})
export class EditIncomeSourceFormComponent implements OnInit {

  @Input() incomeSource: IncomeSourceModel;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitEditedIncomeSource(form: NgForm) {
    console.log(form.value)
    if (form.invalid) {
      console.log('the form is invalid!')
      this.store.dispatch(new IncomeSourceEditCancelled({err: {
        error: {
          Error: "The form value was not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let editedIncomeSourceData: IncomeSourceCreateAndEditModel = {
      income_source_name: form.value.income_source_name,
    }
    this.store.dispatch(new IncomeSourceEditSubmitted(
      {  id: this.incomeSource.id, incomeSource: editedIncomeSourceData }
    ));
    form.resetForm();
  }

}
