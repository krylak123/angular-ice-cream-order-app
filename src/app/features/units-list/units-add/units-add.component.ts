import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitsListService } from '../units-list.service';

interface DialogData {
  key: string;
  unit: string;
}

@Component({
  selector: 'app-units-add',
  templateUrl: './units-add.component.html',
  styleUrls: ['./units-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsAddComponent {
  public unit: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private unitsListService: UnitsListService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public handleOnSubmitProductForm() {
    this.unit.markAllAsTouched();

    if (this.unit.invalid) return;

    const unit = this.unit.value;

    if (this.data.key) {
      this.unitsListService.editUnits(this.data.key, unit);
    } else {
      this.unitsListService.addUnits(unit);
    }
  }
}
