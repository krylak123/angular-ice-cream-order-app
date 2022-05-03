import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from '@shared/enums/role.enum';
import { AppState } from 'src/app/store/app.state';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'data', 'action'];
  public dataSource$ = this.store.select(store => store.users);
  public roleAdmin: string = Role.ADMIN;
  public panelOpenState = false;

  constructor(private usersService: UsersService, private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.usersService.getUsers();
  }

  public deleteUsers(key: string | null) {
    this.usersService.deleteUsers(String(key));
  }
}
