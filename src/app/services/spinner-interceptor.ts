import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService, private toastr: ToastrService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();  //once any outgoing call to server goes, we show spinner
        // this.toastr.info('Request initiated');

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    //this.toastr.success('Request successful');
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                //this.toastr.error(`Request failed: ${error.message}`);
                return throwError(error);
            }),
            finalize(() => {
                this.spinner.hide(); //once the calls get response, we stopper spinner
            })
        );
    }
}