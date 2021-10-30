import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

import { NgxHttpError, NgxHttpMethod } from './ngx-http.types';
import {map} from "rxjs/operators";

export class NgxHttpRequestService<D> {
  public data$: Subject<Partial<{ data: any; loading: boolean; err: any }>> = new Subject();

  constructor(
    private http: HttpClient,
    private httpArgs: any[],
    private method: NgxHttpMethod,
  ) {}

  fetch(filter = {}) {
    switch (this.method) {
      case NgxHttpMethod.GET:
        {
          this.data$.next({ loading: true, err: null });
          this.http
            .get<D>(this.httpArgs[0], ...this.httpArgs.slice(1))
            .pipe(
              map((data) => {

              })
            )
            .subscribe(
              (data) =>
                this.data$.next({
                  loading: false,
                  data: data, // this.options.success(data),
                }),
              (error) =>
                this.data$.next({
                  loading: false,
                  err: new NgxHttpError(error),
                  data: null, // this.options.failed(new NgxHttpError(error)),
                })
            );
        }
        break;
    }
  }

  refetch() {
    // this.fetch(this.filter$.value);
  }


  destroy() {
  }
}
