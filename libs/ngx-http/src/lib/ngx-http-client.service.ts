import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;
type ReturnWatchTypes<D> = {
  data: D;
  loading: boolean;
  err: null;
};

@Injectable({
  providedIn: 'root',
})
export class NgxHttpClientService {
  public watchGet;
  public watchPost;
  public watchPut;
  public watchDelete;

  constructor(private http: HttpClient) {
    type GetArgsType = ArgumentTypes<typeof http.get>;
    type PostArgsType = ArgumentTypes<typeof http.post>;
    type PutArgsType = ArgumentTypes<typeof http.put>;
    type DeleteArgsType = ArgumentTypes<typeof http.delete>;

    this.watchGet = this.watch<GetArgsType>();
    this.watchPost = this.watch<PostArgsType>();
    this.watchPut = this.watch<PutArgsType>();
    this.watchDelete = this.watch<DeleteArgsType>();
  }

  private watch<T extends any[]>(): <D>(
    ...args: T
  ) => Observable<ReturnWatchTypes<D>> {
    return (...args) =>
      new Observable((observer) => {
        // @ts-ignore
        observer.next({ data: null, loading: true, err: null });

        this.http
          .get(args[0], ...args.slice(1))
          .pipe(
            map((data) => {
              // @ts-ignore
              observer.next({ data: data, loading: false, err: null });

              return data;
            }),
            catchError((err) => {
              // @ts-ignore
              observer.next({ data: null, loading: false, err: err });

              return err;
            }),
            finalize(() => observer.complete())
          )
          .subscribe();
      });
  }
}
