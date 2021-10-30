import { NgModule } from '@angular/core';
import { NgxHttpService } from './ngx-http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxHttpClientService } from './ngx-http-client.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [NgxHttpService, NgxHttpClientService],
})
export class NgxHttpModule {}
