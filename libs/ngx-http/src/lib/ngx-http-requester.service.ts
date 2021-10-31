import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxHttpRequestService } from './ngx-http-request.service';
import {
  DeleteType,
  GetType,
  HttpMethod,
  PatchType,
  PostType,
  PutType,
} from './ngx-http.types';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class NgxHttpRequesterService {

  constructor(private http: HttpClient) {}

  public getRequester<T>(method: HttpMethod): (url: string, ...args: T[]) => Observable<any> {
      let requester;

      switch (method) {
        case HttpMethod.Get:
        {
          // @ts-ignore
          requester = (...args) => this.http.get(...args);
        }
          break;
        case HttpMethod.Post:
        {
          // @ts-ignore
          requester = (...args) => this.http.post(...args);
        }
          break;
        case HttpMethod.Put:
        {
          // @ts-ignore
          requester = (...args) => this.http.put(...args);
        }
          break;
        case HttpMethod.Delete:
        {
          // @ts-ignore
          requester = (...args) => this.http.delete(...args);
        }
          break;
        case HttpMethod.Patch:
        {
          // @ts-ignore
          requester = (...args) => this.http.patch(...args);
        }
          break;
      }

      return requester;
    };
}
