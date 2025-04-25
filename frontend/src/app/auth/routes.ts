import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { isNotLoggedGuard } from '../core/guards/is-not-logged.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { SignupComponent } from './signup/signup.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Register',
  },
  {
    path: 'password/reset/confirm',
    component: PasswordResetConfirmComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Password Reset Confirm',
  },
  {
    path: 'password/reset',
    component: PasswordResetComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Password Reset',
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Confirm Email',
  },
];
