import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { isNotLoggedGuard } from '../core/guards/is-not-logged.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Login',
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Confirm Email',
  },
];
