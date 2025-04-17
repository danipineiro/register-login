import {Component,Inject, OnInit} from '@angular/core';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {RegisterDTO} from "../../../models/register-dto";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        MatFormField,
        MatError,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        FormsModule,
        MatInput,
        MatButton,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    }, [this.checkPasswords]);
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password1')?.value;
  const confirmPass = group.get('password2')?.value;
  return pass === confirmPass ? null : { notSame: true };
}

  closeDialog(): void {
    this.dialogRef.close();
  }

  signUp() {
    const registrationData: RegisterDTO = this.signupForm.value;
    console.log(registrationData);
    this.authService.register(registrationData).subscribe({
        next: () => {
          console.log('User registered');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
        complete: () => {
          console.log('Registration completed');
          this.closeDialog();
        }
      }
    );
  }

}
