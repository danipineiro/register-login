import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest, LoginResponse } from '../auth.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatDivider,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const loginRequest: LoginRequest = this.loginForm.value;
    this.authService.login(loginRequest).subscribe({
      next: (response: LoginResponse) => {
        this.authService.setAccessToken(response.access);
        this.authService.setRefreshToken(response.refresh);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
