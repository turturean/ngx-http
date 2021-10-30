import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxHttpModule} from "@ngx-http-app/ngx-http";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxHttpModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
