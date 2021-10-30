import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxHttpRequestService } from './ngx-http-request.service';
import { NgxHttpMethod, NgxHttpOptions } from './ngx-http.types';

@Injectable({
  providedIn: 'root',
})
export class NgxHttpService {
  constructor(private http: HttpClient) {}

  get<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
    return this.call<S, F>(url, NgxHttpMethod.GET, options || {});
  }

  post<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
    return this.call<S, F>(url, NgxHttpMethod.POST, options || {});
  }

  put<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
    return this.call<S, F>(url, NgxHttpMethod.PUT, options || {});
  }

  delete<S, F>(url: string, options = {}): NgxHttpRequestService<S, F> {
    return this.call<S, F>(url, NgxHttpMethod.DELETE, options || {});
  }

  private call<S, F>(
    url: string,
    method: NgxHttpMethod,
    options: NgxHttpOptions<S, F>
  ): NgxHttpRequestService<S, F> {
    return new NgxHttpRequestService(
      this.http,
      url,
      method,
      {...new NgxHttpOptions<S, F>(), ...options}
    );
  }
}
