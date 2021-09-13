import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../../api/services/admin.service';
import { User } from '../../../api/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableOptions, FormComponent } from 'swagular/components';
import { MatDialog } from '@angular/material/dialog';
@Component({ selector: 'app-user', templateUrl: './user.component.html', styleUrls: ['./user.component.scss'] })
export class UserComponent implements OnInit {
  users: User[] = [];
  userFormModel = this.api.saveOrUpdateUserFormModel({
    formTitle: 'Add New User',
    displayProperties: ['firstName', 'lastName', 'email', 'phone', 'role']
  });
  usersTableOptions: TableOptions<User> = {
    columns: [
      { key: 'firstName', title: 'First Name', isFilterable: true, isSortable: false },
      { key: 'lastName', title: 'Last Name' },
      { key: 'phone', title: 'Phone Number' },
      { key: 'email', title: 'Email' },
      { key: 'role', title: 'Role' }
    ],
    rowActions: [
      {
        icon: 'edit',
        action: ($event, row) => this.openEditUserDialog(row)
      },
      {
        icon: 'delete',
        action: ($event, row) => this.deleteUser(row)
      }
    ]
  };
  constructor(private api: AdminService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    api.users().subscribe(users => (this.users = users));
  }

  ngOnInit(): void {}

  openEditUserDialog(user?: User): void {
    if (user) this.userFormModel.formGroup.patchValue(user);
    else this.userFormModel.formGroup.reset();
    const dialogRef = this.dialog.open(FormComponent, {
      width: '80%',
      maxWidth: '540px',
      data: this.userFormModel,
      panelClass: 'admin-form'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const relevant = this.users.find(u => u._id === result._id);
        this.api.saveOrUpdateUser(result).subscribe(savedUser => {
          if (!relevant) this.users = this.users.concat([savedUser]);
          else {
            Object.keys(result).forEach(key => ((relevant as any)[key] = result[key]));
            this.users = [...this.users];
          }
          this.snackBar.open('User was saved successfully', '', { duration: 2000 });
        });
      }
    });
  }

  deleteUser(row: User) {
    this.api.deleteUser(row).subscribe(user => {
      this.users = this.users.filter(u => u._id !== user._id);
      const snackBarRef = this.snackBar.open('User was deleted successfully', 'Cancel', {
        duration: 2000
      });
      snackBarRef.onAction().subscribe(() => {
        this.users = this.users.concat([user]);
        this.api.unDeleteUser(row).subscribe(() => this.snackBar.open('User was undeleted successfully', '', { duration: 2000 }));
      });
    });
  }
}