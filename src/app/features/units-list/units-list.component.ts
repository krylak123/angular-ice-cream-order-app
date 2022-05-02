import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { UnitsAddComponent } from './units-add/units-add.component';
import { UnitsListService } from './units-list.service';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsListComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'data', 'action'];
  public dataSource$ = this.store.select(store => store.users);

  constructor(
    public dialog: MatDialog,
    private unitsListService: UnitsListService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.unitsListService.getUnits();
  }

  public openDialog(key?: string, oldName?: string) {
    const dialogRef = this.dialog.open(UnitsAddComponent, {
      data: {
        key,
        oldName,
      },
    });

    dialogRef.afterClosed().subscribe();
  }
}
