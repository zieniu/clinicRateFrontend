import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserDeleteDialogComponent } from './user-delete-dialog/user-delete-dialog.component';
import { Role } from 'src/_models/users';
import { UserHttpService } from 'src/_services/http/user-http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-more-info',
  templateUrl: './user-more-info.component.html',
  styleUrls: ['./user-more-info.component.scss']
})
export class UserMoreInfoComponent implements OnInit, OnDestroy {

  roles: any;
  roleLvl = Role; // typ wyliczeniowy enum

  private userDelSub: Subscription; // zmienna odpowiedzialna za subskrybcje

  constructor(public dialogRef: MatDialogRef<UserMoreInfoComponent>, public dialog: MatDialog, private userHttpService: UserHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.roles = Object.keys(this.roleLvl).filter(f => !isNaN(Number(f))); // wypisanie do zmiennej typu wyliczeniowego
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.userDelSub !== undefined) {
      this.userDelSub.unsubscribe();
    }
  }

  openConfirmationDialog(availability: number): void {  // okno zatwierdzania usuniecia badz przywrocenia pracownika
    let dialogRef;
    dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      data: { available: availability },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  // jezeli tak to wtedy zapisz
        this.userDelSub = this.userHttpService.delete(this.data.ticket.userId).subscribe(sub => {
          this.data.ticket.deleted = result.available;
          console.log(result);
        },
          error => {
            console.log(error);
          });
      } else {
        console.log('The dialog was closed');
      }
    });
  }

  statusButtonDelete(deleted) { // sprawdzanie statusu dostepnosci
    if (deleted === 0) {
      return 'Usuń';
    } else {
      return 'Przywróć';
    }
  }
}

