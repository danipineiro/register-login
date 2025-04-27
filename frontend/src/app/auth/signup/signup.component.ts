import { Component, OnInit } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatAnchor, MatButton } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { RegisterRequest } from '../auth.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormField,
    MatError,
    FormsModule,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatLabel,
    MatAnchor,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required),
      },
      [this.checkPasswords],
    );
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password1')?.value;
    const confirmPass = group.get('password2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  submit() {
    const registrationData: RegisterRequest = this.signupForm.value;
    this.authService.register(registrationData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Please check your email to verify your account');
      },
      error: (error) => {
        this.notificationService.showError('An error occurred during registration');
      },
    });
  }
}
