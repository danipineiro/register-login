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
import { GoogleSigninButtonDirective, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

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
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.socialAuthService.authState.subscribe((user: SocialUser | null) => {
      if (user) {
        console.log('Google user:', user);
        const idToken = user.idToken;

        // Aquí haces POST a tu backend con el idToken
        // this.http.post('/api/social-login/', { token: idToken }).subscribe(...)
      }
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
