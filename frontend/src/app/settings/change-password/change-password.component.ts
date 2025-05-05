import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(
    private fb: FormBuilder,
    private auhthService: AuthService,
    private notification: NotificationService,
  ) {}

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const password1 = group.get('new_password1')?.value;
    const password2 = group.get('new_password2')?.value;
    return password1 === password2 ? null : { notSame: true };
  };

  form = this.fb.group(
    {
      old_password: ['', Validators.required],
      new_password1: ['', [Validators.required, Validators.minLength(8)]],
      new_password2: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator },
  );

  onSubmit() {
    if (this.form.invalid) return;

    const oldPassword = this.form.value.old_password!;
    const newPassword1 = this.form.value.new_password1!;
    const newPassword2 = this.form.value.new_password2!;

    this.auhthService.changePassword(oldPassword, newPassword1, newPassword2).subscribe({
      next: () => {
        this.notification.showSuccess('Your password has been reset successfully.');
      },
      error: (error) => {
        this.notification.showError(error.error.message);
      },
    });
  }
}
