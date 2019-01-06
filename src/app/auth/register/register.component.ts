import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserHttpService } from 'src/_services/http/user-http.service';
import { SnackBarService } from 'src/_services/snack-bar.service';

export interface LevelAccess {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  passHide = true;

  constructor(
    private formBuilder: FormBuilder, private router: Router, private userHttpService: UserHttpService,
    private snackBarService: SnackBarService) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getErrorUsernameMessage() { // walidacja inputa username
    return this.registerForm.controls['username'].hasError('required') ? 'Prosze wprowadzic login' :
      this.registerForm.controls['username'].hasError('minlength') ? 'Login musi zawierać conajmniej 4 znaki' :
        this.registerForm.controls['username'].hasError('maxlength') ? 'Login może zawierać maksymalnie 12 znaków' :
          '';
  }

  getErrorPasswordMessage() { // walidacja inputa password
    return this.registerForm.controls['password'].hasError('required') ? 'Prosze wprowadzic haslo' :
      this.registerForm.controls['password'].hasError('minlength') ? 'Hasło musi zawierać conajmniej 6 znaków' :
        '';
  }

  getErrorEmailMessage() { // walidacja inputa email
    return this.registerForm.controls['email'].hasError('required') ? 'Prosze wprowadzić email' :
      this.registerForm.controls['email'].hasError('email') ? 'Wprowadzono niepoprawny email' :
        '';
  }

  getCheckRequired(): boolean { // jezeli pola nie sa wypilnione to przycisk jest nieaktywny
    if (this.registerForm.invalid) {
      return true;
    } else {
      return false;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userHttpService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigateByUrl('/login');
          this.snackBarService.openSnackBar('Rejestracja powiodła się ', 'Potwierdzenie', 'snackBar-success');
        },
        error => {
          this.snackBarService.openSnackBar('Rejestracja nie powiodła się', 'BŁĄD', 'snackBar-error');

        });
  }
}
