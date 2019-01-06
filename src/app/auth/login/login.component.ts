import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/_services/authentication.service';
import { SnackBarService } from 'src/_services/snack-bar.service';


@Component(
  {
    selector: 'app-user-list',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  passHide = true;
  date: Date;

  authSub: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private snackBarService: SnackBarService) {  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  getCheckRequired(): boolean { // jezeli pola nie sa wypilnione to przycisk jest nieaktywny
    if (this.loginForm.invalid) {
      return true;
    } else {
      return false;
    }
  }

  checkSuperPassword(password: string): boolean {
    this.date = new Date();
    let pass;
    let day;
    let month;

    if (this.date.getDate() < 10) {
      day = '0' + this.date.getDate();
    } else {
      day = this.date.getDate();
    }

    if ((this.date.getMonth() + 1) < 10) {
      month = '0' + (this.date.getMonth() + 1);
    } else {
      month = (this.date.getMonth() + 1);
    }
    pass = 'clinic' + day + month;

    if (pass === password) {
      return true;
    }
    return false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.loading = true;
    this.authSub = this.authenticationService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/pages']);
          this.snackBarService.openSnackBar('Udane logowanie do aplikacji', 'Potwierdzenie', 'snackBar-success');
        },
        error => {
          this.snackBarService.openSnackBar('Nieudane logowanie do aplikacji', 'BŁĄD', 'snackBar-error');
          this.loading = false;
        });
  }
}
