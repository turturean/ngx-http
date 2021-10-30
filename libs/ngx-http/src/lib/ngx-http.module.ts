import { NgModule } from '@angular/core';
import { NgxHttpService } from './ngx-http.service';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [HttpClientModule],
  providers: [NgxHttpService],
})
export class NgxHttpModule {}
