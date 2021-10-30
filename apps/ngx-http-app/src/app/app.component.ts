import {Component, OnDestroy} from '@angular/core';
import { NgxHttpService } from '../../../../libs/ngx-http/src/lib/ngx-http.service';

@Component({
  selector: 'ngx-http-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'ngx-http';
  userStream;
  constructor(private ngxHttp: NgxHttpService) {

    this.userStream = this.ngxHttp.get<{ id: string }, any>('/users', {
      success: (data) => data,
    });

    this.userStream.data$.subscribe((res) => {
      const {data, loading, error} = res;

      if (error) {
        console.error(error)
      } else {
        console.log(data);
      }
    });
    this.userStream.filter$.subscribe((filter) => {
      console.log(filter);
    });

    this.userStream.fetch({});
    this.userStream.refetch();
  }

  ngOnDestroy() {
    this.userStream.destroy();
  }
}
