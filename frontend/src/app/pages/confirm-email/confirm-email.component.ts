import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const key = this.activatedRoute.snapshot.queryParamMap.get('key');

    if (key) {
      this.authService.verifyEmail(key).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (error) => {
          console.error('Error confirming email:', error);
          this.loading = false;
        },
      });
    } else {
      console.error('No key provided for email confirmation.');
      this.loading = false;
    }
    this.router.navigate(['auth//login']);
  }
}
