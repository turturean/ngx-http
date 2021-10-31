import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import {
  DeleteType,
  GetType,
  HttpMethod,
  PatchType,
  PostType,
  PutType,
  ReturnWatchTypes,
} from './ngx-http.types';
import { NgxHttpRequesterService } from './ngx-http-requester.service';

@Injectable({
  providedIn: 'root',
})
export class NgxHttpClientService {
  get = this.watch<GetType>(HttpMethod.Get);
  post = this.watch<PostType>(HttpMethod.Post);
  put = this.watch<PutType>(HttpMethod.Put);
  delete = this.watch<DeleteType>(HttpMethod.Delete);
  patch = this.watch<PatchType>(HttpMethod.Patch);

  constructor(private httpRequester: NgxHttpRequesterService) {}

  private watch<T extends any[]>(
    method: HttpMethod
  ): <D>(url: string, ...args: T) => Observable<ReturnWatchTypes<D>> {
    return (url: string, ...args) =>
      new Observable((observer) => {
        // @ts-ignore
        observer.next({ data: null, loading: true, err: null });

        let requester = this.httpRequester.getRequester<T[]>(method);

        requester(url, ...args)
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
