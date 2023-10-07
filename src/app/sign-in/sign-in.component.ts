import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}
  userEmail: string = '';
  userPassword: string = '';
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.authService.SignIn(this.userEmail, this.userPassword);
  }
}
