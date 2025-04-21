import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { isNotLoggedGuard } from './guards/is-not-logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isLoggedGuard],
    title: 'Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Login page',
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    canActivate: [isNotLoggedGuard],
    title: 'Confirm email',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
