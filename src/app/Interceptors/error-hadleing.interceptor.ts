import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHadleingInterceptor implements HttpInterceptor {
  constructor(private router: Router,private toastr:ToastrService) {}

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // const authReq = request.clone({ headers: request.headers.set("Authorization", localStorage.getItem("Authorization") as string) });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        // console.log(err);
        
        let message = '';
        if (err.status != 200) {
          // handle client-side error
            Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: "عفوا لقد حدث خطأ ! الرجاء الإتصال بالدعم الفنى على الرقم 19456",
        })
          }         
        // return the error back to the caller
        return throwError(err);
      })
    );
  }

}

