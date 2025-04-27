import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../auth.service';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-password-reset',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    MatDivider,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private notification: NotificationService,
    private authService: AuthService,
  ) {}

  submit() {
    if (this.forgotPasswordForm.invalid) return;

    const email = this.forgotPasswordForm.value.email!;

    this.authService.passwordReset(email).subscribe({
      next: () => {
        this.notification.showSuccess('If that email is registered, a reset link was sent.');
      },
      error: (error) => {
        this.notification.showError(error.error.message);
      },
    });
    this.forgotPasswordForm.reset();
  }
}
