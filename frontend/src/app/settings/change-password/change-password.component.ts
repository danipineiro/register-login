import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

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

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      const { old_password, new_password1, new_password2 } = this.form.value;
      // Aquí puedes emitir el cambio de contraseña o hacer una petición HTTP
      console.log('Submit', { old_password, new_password1, new_password2 });
    }
  }

}
