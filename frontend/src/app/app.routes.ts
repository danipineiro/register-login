import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { authRoutes } from './auth/routes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isLoggedGuard],
    title: 'Home',
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
