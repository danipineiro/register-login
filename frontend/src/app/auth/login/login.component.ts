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
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest, LoginResponse } from '../auth.model';
import { TranslatePipe } from '@ngx-translate/core';
import {
  GoogleSigninButtonDirective,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    GoogleSigninButtonDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: SocialUser | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.subscribeToGoogleAuth();
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const loginRequest: LoginRequest = this.loginForm.value;
    this.authService.login(loginRequest).subscribe({
      next: (res) => this.handleLoginSuccess(res),
      error: (err) => this.handleError(err),
    });
  }

  private subscribeToGoogleAuth(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser | null) => {
      if (user) this.handleGoogleLogin(user.idToken);
    });
  }

  private handleGoogleLogin(idToken: string): void {
    this.authService.loginWithGoogle(idToken).subscribe({
      next: (res) => this.handleLoginSuccess(res),
      error: (err) => this.handleError(err),
    });
  }

  private handleLoginSuccess(response: LoginResponse): void {
    this.authService.setAccessToken(response.access);
    this.authService.setRefreshToken(response.refresh);
    this.router.navigate(['/']);
  }

  private handleError(error: any): void {
    console.error('Login error:', error);
  }
}
