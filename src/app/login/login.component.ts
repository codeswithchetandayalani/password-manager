import { Component } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isError: boolean = false;
  constructor(
    private passwordmanager: PasswordManagerService,
    private router: Router
  ) {}
  onsubmit(values: any) {
    try {
      this.passwordmanager
        .login(values.email, values.password)
        .then(() => {
          console.log('Login Successfully');
          this.router.navigate(['/site-list']);
        })
        .catch((err) => {
          this.isError = true;
          console.log('Error', err);
        });
    } catch (error) {

      console.log('Error', error);
    }
  }
}
