import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(public authService: AuthService) {}
  btn: HTMLButtonElement;
  ngOnInit() {
    this.btn = document.getElementById('resendEmailBtn') as HTMLButtonElement;
  }
  sendVerificationEmail() {
    this.authService.SendVerificationMail();
    this.btn.disabled = true;
    this.btn.classList.add('bg-gray-dark');
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        this.btn.innerHTML = `Resend Verification Email (${60 - i})`;
      }, i * 1000);
    }
    setTimeout(() => {
      this.btn.innerHTML = 'Resend Verification Email';
      this.btn.disabled = false;
      this.btn.classList.remove('bg-gray-dark');
    }, 60000);
  }
}
