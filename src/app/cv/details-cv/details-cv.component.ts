import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv: Cv | null = null;

  // observable
  cv$!: Observable<Cv | null> | null;

  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // observable: params
    this.cv$ = this.activatedRoute.params.pipe(
      switchMap((params) =>
        this.cvService.getCvById(+params['id']).pipe(
          catchError((e) => {
            this.router.navigate([APP_ROUTES.cv]);
            return of(null);
          })
        )
      )
    );

    // snapshot
    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.cv$ = this.cvService.getCvById(id).pipe(
    //   catchError(() => {
    //     this.router.navigate([APP_ROUTES.cv]);
    //     return of(null);
    //   })
    // );

    // this.cvService.getCvById(+id).subscribe({
    //     next: (cv) => {
    //       this.cv = cv;
    //     },
    //     error: (e) => {
    //       this.router.navigate([APP_ROUTES.cv]);
    //     },
    //   });
  }
  deleteCv(cv: Cv) {
    this.cvService
      .deleteCvById(cv.id)
      .pipe(
        catchError(() => {
          this.toastr.error(
            `Problème avec le serveur veuillez contacter l'admin`
          );
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          this.toastr.success(`${cv.name} supprimé avec succès`);
          this.router.navigate([APP_ROUTES.cv]);
        },
      });

    // this.cvService.deleteCvById(cv.id).subscribe({
    //   next: () => {
    //     this.toastr.success(`${cv.name} supprimé avec succès`);
    //     this.router.navigate([APP_ROUTES.cv]);
    //   },
    //   error: () => {
    //     this.toastr.error(
    //       `Problème avec le serveur veuillez contacter l'admin`
    //     );
    //   },
    // });
  }
}
