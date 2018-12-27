import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-user-delete-dialog",
  templateUrl: "./user-delete-dialog.component.html",
  styleUrls: ["./user-delete-dialog.component.scss"]
})
export class UserDeleteDialogComponent implements OnInit {

  content: string;
  constructor(public dialogRef: MatDialogRef<UserDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.available === 0) {  // uzupelnianie confirm dialogu, przypisywanie do deleted wartosci
      this.content = "Czy napewno chcesz usunąć użytkownika?";
      this.data.available = 1;
    } else {
      this.content = "Czy napewno chcesz przywrócic użytkownika?";
      this.data.available = 0;
    }
  }

}
