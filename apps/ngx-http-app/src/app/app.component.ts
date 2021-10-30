import { Component, OnDestroy } from '@angular/core';
import { NgxHttpClientService, NgxHttpService } from '@ngx-http-app/ngx-http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-http-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'ngx-http';
  constructor(
    private ngxHttp: NgxHttpService,
    private http: HttpClient,
    private ngxHttpClient: NgxHttpClientService
  ) {
    // this.ngxHttpClient
    //   .watchGet<{id: string}[]>('http://localhost:3000/test')
    //   .subscribe(({ data, loading, err }) => {
    //     if (loading) {
    //       console.log('Is loading', loading);
    //     } else if (err) {
    //       console.log('Error', err);
    //     } else if (!loading) {
    //       console.log('Done', data);
    //     }
    //   });

    const userStream = this.ngxHttp.streamGet<{ id: string }>('http://localhost:3000/test');

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
    // userStream.refetch();

    // this.http
    //   .get('http://localhost:3000/test', {
    //     observe: 'events',
    //     reportProgress: true,
    //   })
    //   .subscribe((res) => {
    //     console.log('Res', res);
    //   });
  }

  ngOnDestroy() {
    // this.userStream.destroy();
  }
}
