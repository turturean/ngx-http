import { Observable, Subject } from 'rxjs';
import { ReturnWatchTypes } from './ngx-http.types';

export class NgxHttpRequestService<D, P extends any[]> {
  public data$: Subject<Partial<ReturnWatchTypes<D>>> = new Subject();

  constructor(
    private url: string,
    private args: P[],
    private requester: (url: string, ...args: P[]) => Observable<D>
  ) {}

  fetch(...args: P) {
    this.data$.next({ loading: true, err: null });
    this.args = args && args.length ? args : this.args;

    this.requester(this.url, ...this.args).subscribe(
      (data) =>
        this.data$.next({
          loading: false,
          data: data, // this.options.success(data),
        }),
      (err) =>
        this.data$.next({
          loading: false,
          err: err,
          data: undefined, // this.options.failed(new NgxHttpError(error)),
        })
    );
  }
}
