import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-password-reset-confirm',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.scss',
})
export class PasswordResetConfirmComponent implements OnInit {
  uid = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const password1 = group.get('new_password1')?.value;
    const password2 = group.get('new_password2')?.value;
    return password1 === password2 ? null : { notSame: true };
  };

  newPasswordForm = new FormGroup(
    {
      new_password1: new FormControl('', [Validators.required]),
      new_password2: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );

  get newPassword1RequiredError() {
    return (
      this.newPasswordForm.get('new_password1')?.hasError('required') &&
      (this.newPasswordForm.get('new_password1')?.touched ||
        this.newPasswordForm.get('new_password1')?.dirty)
    );
  }

  get newPassword2RequiredError() {
    return (
      this.newPasswordForm.get('new_password2')?.hasError('required') &&
      (this.newPasswordForm.get('new_password2')?.touched ||
        this.newPasswordForm.get('new_password2')?.dirty)
    );
  }

  submit() {
    if (this.newPasswordForm.invalid) return;

    const newPassword1 = this.newPasswordForm.value.new_password1!;
    const newPassword2 = this.newPasswordForm.value.new_password2!;

    this.authService
      .passwordResetConfirm(this.uid, this.token, newPassword1, newPassword2)
      .subscribe({
        next: () => {
          this.notification.showSuccess('Your password has been reset successfully.');
          this.router.navigate(['auth//login']);
        },
        error: (error) => {
          this.notification.showError(error.error.message);
        },
      });
    this.newPasswordForm.reset();
  }
}
