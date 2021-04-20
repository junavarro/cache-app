import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeComponent } from './components/node/node.component';
import { MatTableModule } from '@angular/material/table';
import { MainMemoryComponent } from './components/main-memory/main-memory.component';
import { CacheL2Component } from './components/cache-l2/cache-l2.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    MainMemoryComponent,
    CacheL2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  exports: [NodeComponent, MainMemoryComponent, CacheL2Component,MainMemoryComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
