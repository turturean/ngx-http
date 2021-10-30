import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { NgxHttpError, NgxHttpMethod, NgxHttpOptions } from './ngx-http.types';

export class NgxHttpRequestService<S, F> {
  public data$: BehaviorSubject<{ data: any; loading: boolean; error: any }> =
    new BehaviorSubject({
      data: null,
      loading: false,
      error: null,
    });
  public filter$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private url: string,
    private method: NgxHttpMethod,
    private options: NgxHttpOptions<S, F>,
  ) {}

  fetch(filter = {}) {
    this.filter$.next(filter);
    const { data } = this.data$.getValue();

    switch (this.method) {
      case NgxHttpMethod.GET:
        {
          const params = this.toHttpParams(filter);
          this.data$.next({
            data: data,
            loading: true,
            error: null,
          });
          this.http
            .get<S>(this.url, {
              params,
            })
            .subscribe(
              (data) =>
                this.data$.next({
                  loading: false,
                  error: null,
                  data: this.options.success(data),
                }),
              (error) =>
                this.data$.next({
                  loading: false,
                  error: new NgxHttpError(error),
                  data: this.options.failed(new NgxHttpError(error)),
                })
            );
        }
        break;
    }
  }

  refetch() {
    this.fetch(this.filter$.value);
  }

  destroy() {
  }

  private toHttpParams(filter: { [key: string]: any } = {}) {
    let params = new HttpParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (key && value) {
        params = params.set(key, value);
      }
    });

    return params;
  }
}
