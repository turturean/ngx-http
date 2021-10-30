export enum NgxHttpMethod {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  jsonp = 'jsonp',
}

export class NgxHttpOptions<S, F> {
  cache?: boolean = false;
  pooling?: boolean = false;
  success? = (data: S): S | null => data ? data : null;
  failed? = (err: F): F | null => err ? err :  null;
}

export class NgxHttpError {
  date: Date;
  error: any;

  constructor(error: any) {
    this.date = new Date();
    this.error = error;
  }
}
