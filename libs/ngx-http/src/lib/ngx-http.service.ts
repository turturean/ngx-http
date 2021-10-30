import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxHttpRequestService } from './ngx-http-request.service';
import { NgxHttpMethod, NgxHttpOptions } from './ngx-http.types';

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
export class NgxHttpService {
  public streamGet;

  constructor(private http: HttpClient) {
    type GetArgsType = ArgumentTypes<typeof http.get>;
    this.streamGet = this.watch<GetArgsType>();
  }

  private watch<T extends any[]>(): <D>(
    ...args: T
  ) => NgxHttpRequestService<D> {
    return (...args: T[]) =>{
      const newHttpReq =  new NgxHttpRequestService(this.http, args, NgxHttpMethod.GET);


      return newHttpReq
    }

    // return (...args) =>
    //   new Observable((observer) => {
    //     // @ts-ignore
    //     observer.next({ data: null, loading: true, err: null });
    //
    //     this.http
    //       .get(args[0], ...args.slice(1))
    //       .pipe(
    //         map((data) => {
    //           // @ts-ignore
    //           observer.next({ data: data, loading: false, err: null });
    //
    //           return data;
    //         }),
    //         catchError((err) => {
    //           // @ts-ignore
    //           observer.next({ data: null, loading: false, err: err });
    //
    //           return err;
    //         }),
    //         finalize(() => observer.complete())
    //       )
    //       .subscribe();
    //   });
  }

  // get<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
  //   return this.call<S, F>(url, NgxHttpMethod.GET, options || {});
  // }
  //
  // post<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
  //   return this.call<S, F>(url, NgxHttpMethod.POST, options || {});
  // }
  //
  // put<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
  //   return this.call<S, F>(url, NgxHttpMethod.PUT, options || {});
  // }
  //
  // delete<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
  //   return this.call<S, F>(url, NgxHttpMethod.DELETE, options || {});
  // }

  // private call<S, F>(
  //   url: string,
  //   method: NgxHttpMethod,
  //   options: NgxHttpOptions<S, F>
  // ): NgxHttpRequestService<S, F> {
  //   return new NgxHttpRequestService(
  //     this.http,
  //     url,
  //     method,
  //     {...new NgxHttpOptions<S, F>(), ...options}
  //   );
  // }
}
