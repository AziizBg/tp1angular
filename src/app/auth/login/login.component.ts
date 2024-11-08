import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { ROUTES, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { FormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(credentials: CredentialsDto) {
    this.authService
      .login(credentials)
      .pipe(
        tap((response) => {
          // Side effect:  show success toast and navigate to CV page
          this.toastr.success('Bienvenue chez vous 🙂');
          this.router.navigate([APP_ROUTES.cv]);
        }),
        catchError((error) => {
          // Handle error side effect: show error toast
          this.toastr.error('Veuillez vérifier vos credentials');
          return of(null); // Return a fallback value to continue the stream
        })
      )
      .subscribe();
  }
}
