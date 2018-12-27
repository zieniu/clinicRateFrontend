import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserHttpService } from 'src/_services/http/user-http.service';

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
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  passHide = true;

  // accessLevel: LevelAccess[] = [  // poziomy dostepu
  //   { value: 10, viewValue: 'Odczyt' },
  //   { value: 20, viewValue: 'Konserwator' },
  //   { value: 30, viewValue: 'Moderator' },
  //   { value: 40, viewValue: 'Administrator' }
  // ];

  constructor(
    private formBuilder: FormBuilder, private router: Router, private userHttpService: UserHttpService) { }




  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required]
    });
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
        });
  }
}
