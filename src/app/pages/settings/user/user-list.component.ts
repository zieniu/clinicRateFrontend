import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { UserMoreInfoComponent } from './user-more-info/user-more-info.component';
import { Users } from 'src/_models/users';
import { UserHttpService } from 'src/_services/http/user-http.service';
import { SnackBarService } from 'src/_services/snack-bar.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['numberUsers', 'login', 'permissions', 'deleted', 'buttonMore'];
  dataSource: MatTableDataSource<Users>;
  availability = ['Dostępne', 'Usunięte', 'Wszystkie']; // nazwy radiobuttonow
  filterList: any;  // wyfiltrowana lista uzytkownikow (dostepne,usuniete,wszystko)
  userFilter: any;
  userList: Users[] = [];
  accessLevel: any;

  constructor(public dialog: MatDialog, private userHttpService: UserHttpService, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.userHttpService.getAll().subscribe(user => { // pobranie listy uzytkownikow
      user.forEach(us => {
        const usr = new Users(); // przepakowanie obiektu do klasy users
        usr.dateCreated = us.dateCreated;
        usr.deleted = us.deleted;
        usr.username = us.username;
        usr.password = us.password;
        usr.accessLevel = us.accessLevel;
        usr.userId = us.userId;
        this.userList.push(usr);
      });
      this.dataSource = new MatTableDataSource(this.userList);
    },
      error => {
       console.log(error);
      });
  }

  applyFilter(filterValue: string) {  // filtrowanie tabeli
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDetailsModal(viewTable: any, viewTicket: Users, InEditMode: boolean, head: string, createNew: boolean) {
    let ticket = new Users();
    let isNewTicket = false;
    const isInEditMode = InEditMode;
    const create = createNew; // jezeli tworzymy nowego pracownika to true


    if (viewTicket) {
      Object.assign(ticket, viewTicket);
    } else {
      ticket = new Users();
      isNewTicket = true;
    }

    const detailsModalRef = this.dialog.open(UserMoreInfoComponent, {
      data: { ticket: ticket, accessLevel: this.accessLevel, isInEditMode: InEditMode, header: head, create: createNew }
    });

    detailsModalRef.afterClosed().subscribe(result => {
      if (result) {
        viewTicket.copyValues(ticket);
        this.userHttpService.update(result.ticket).subscribe(us => {
console.log(result);
this.snackBarService.openSnackBar('Operacja udana.', 'Potwierdzenie', 'snackBar-success');
        },
          error => {
console.log(error);
this.snackBarService.openSnackBar('Operacja niepowiodła się.', 'BŁĄD', 'snackBar-error');
          });
        viewTable.renderRows();
      }

      if (viewTicket && viewTicket.deleted !== ticket.deleted) {  // jezeli usuniemy uzytkownika w tym miejscu nastepuje porownanie danych,
        viewTicket.copyValues(ticket);              // obiekt zostaje przepisany i tablica odswiezona
        viewTable.renderRows();
      }
    });
  }
}
