# ngx-http

#Solution 1
```Typescript
this.ngxHttpClient
  .get<{ id: string }[]>('http://localhost:3000/test', {
    params: (new HttpParams()).set('test', 34)
  })
  .subscribe(({ data, loading, err }) => {
    if(loading) {
        console.log('Is loading');
    } else if(err) {
        console.log('Some error');
    } else {
        console.log('Done', data)
    }
});
```

#Solution 2
```typescript
import { Component } from '@angular/core';
import { NgxHttpService } from '@ngx-http-app/ngx-http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-http-root',
  template: `
    <ng-container *ngIf="userStream.data$ | async as data">
      <ng-container *ngIf="data.loading"> Show Loading </ng-container>

      <ng-container *ngIf="!data.loading && data.err">
        Show error {{ data.err }}
      </ng-container>

      <ng-container *ngIf="!data.loading && !data.err">
        Show data {{ data.data }}
      </ng-container>

      <button [disabled]="data.loading" (click)="userStream.fetch()">
        Search
      </button>
    </ng-container>
  `,
})
export class AppComponent {
  userStream;
  constructor(private ngxHttp: NgxHttpService) {
    this.userStream = this.ngxHttp.post<{ id: string }[]>(
      'http://localhost:3000/test',
      {
        params: new HttpParams().set('test2', 34),
      }
    );

    this.userStream.data$.subscribe((res) => {
      const { data, loading, err } = res;

      if (loading) {
        console.log('Is loading', loading);
      } else if (err) {
        console.log('Error', err);
      } else if (!loading) {
        console.log('Done', data);
      }
    });
  }
}


```
