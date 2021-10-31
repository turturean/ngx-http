import { Injectable } from '@angular/core';
import { NgxHttpRequestService } from './ngx-http-request.service';
import {
  DeleteType,
  GetType,
  HttpMethod,
  PatchType,
  PostType,
  PutType,
} from './ngx-http.types';
import { NgxHttpRequesterService } from './ngx-http-requester.service';

@Injectable({
  providedIn: 'root',
})
export class NgxHttpService {
  get = this.watch<GetType>(HttpMethod.Get);
  post = this.watch<PostType>(HttpMethod.Post);
  put = this.watch<PutType>(HttpMethod.Put);
  delete = this.watch<DeleteType>(HttpMethod.Delete);
  patch = this.watch<PatchType>(HttpMethod.Patch);

  constructor(private httpRequester: NgxHttpRequesterService) {}

  private watch<P extends any[]>(
    method: HttpMethod
  ): <D>(url: string, ...args: P) => NgxHttpRequestService<D, P> {
    return <D>(url: string, ...args: P) => {
      let requester = this.httpRequester.getRequester<P>(method);

      return new NgxHttpRequestService<D, P>(url, args, requester);
    };
  }
}
