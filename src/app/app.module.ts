import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeComponent } from './node/node.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports:[NodeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
