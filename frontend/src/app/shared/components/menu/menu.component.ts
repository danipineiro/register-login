import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { CurrentUser } from '../../../user/current-user';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatButton, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  currentUser: CurrentUser | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user: CurrentUser) => {
        this.currentUser = user;
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
