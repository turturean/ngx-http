import { Component, OnDestroy } from '@angular/core';
import { NgxHttpClientService, NgxHttpService } from '@ngx-http-app/ngx-http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-http-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'ngx-http';
  constructor(
    private ngxHttp: NgxHttpService,
    private ngxHttpClient: NgxHttpClientService
  ) {
    this.ngxHttpClient
      .get<{id: string}[]>('http://localhost:3000/test', {
        params: (new HttpParams()).set('test', 34)
      })
      .subscribe(({ data, loading, err }) => {
        console.log(`Data:${String(data)} loading: ${Boolean(loading)}  error: ${String(err)}`);
      });

    const userStream = this.ngxHttp.post<{ id: string }[]>('http://localhost:3000/test',
      {
        params: (new HttpParams()).set('test2', 34)
      });

    userStream.data$.subscribe((res) => {
      const { data, loading, err } = res;

      if (loading) {
        console.log('Is loading', loading)
      } else if(err) {
        console.log('Error', err)
      } else if(!loading) {
        console.log('Done', data)
      }
    });

    userStream.fetch({});
  }

  ngOnDestroy() {
  }
}
