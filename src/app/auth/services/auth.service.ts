import { computed, Injectable, Signal, WritableSignal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { signal } from '@angular/core'; // Importation du signal
import { catchError, Observable, of, tap } from 'rxjs';
import { APP_ROUTES } from 'src/config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signal pour l'état d'authentification et les informations de l'utilisateur
  userState = signal<{id: string | null; email: string | null }>({
    id: null,
    email: null,
  });
  isAuthenticated_s = computed(() => this.userState().id !== null);

  constructor(private http: HttpClient) {
    // Charger l'état de l'utilisateur au démarrage de l'application
    this.loadUserState();
  }

  get userState$() {
    return this.userState;
  }

  login(credentials: CredentialsDto) {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // Effet secondaire : stocker les détails de l'utilisateur et afficher un toast de succès
        localStorage.setItem('token', response.id);
        this.storeUserDetails(response.userId.toString(), credentials.email);
      }),
      catchError((error) => {
        return of(null); // Retourner une valeur de repli pour continuer le flux
      })
    )
  }

  isAuthenticated(): boolean {
    return this.isAuthenticated_s();
  }

  logout() {
    // Effacer les données et mettre à jour le signal
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    this.userState.set({ id: null, email: null });
  }

  private loadUserState() {
    const token = localStorage.getItem('token');
    if (token) {
      // Si un token existe, on simule une requête pour récupérer l'ID et l'email de l'utilisateur
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      if (userId && userEmail) {
        this.userState.set({
          id: userId,
          email: userEmail,
        });
      }
    }
  }

  storeUserDetails(userId: string, userEmail: string) {
    // Stocker les informations de l'utilisateur dans localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);
    this.userState.set({ id: userId, email: userEmail });
  }
}
