import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeComponent } from './components/node/node.component';
import { MainMemoryComponent } from './components/main-memory/main-memory.component';
import { CacheL2Component } from './components/cache-l2/cache-l2.component';
import { CacheL1FormComponent } from './components/cache-l1-form/cache-l1-form.component';
import { CacheL2FormComponent } from './components/cache-l2-form/cache-l2-form.component';
import { RamFormComponent } from './components/ram-form/ram-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { InstructionEditorComponent } from './components/instruction-editor/instruction-editor.component';
import { MatDialogModule} from '@angular/material/dialog';
import { QueueViewerComponent } from './components/queue-viewer/queue-viewer.component';
@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    MainMemoryComponent,
    CacheL2Component,
    CacheL1FormComponent,
    CacheL2FormComponent,
    RamFormComponent,
    InstructionEditorComponent,
    QueueViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    NodeComponent,
    MainMemoryComponent,
    CacheL2Component,
    MainMemoryComponent,
    CacheL1FormComponent,
    CacheL2FormComponent,
    RamFormComponent,
    InstructionEditorComponent,
    QueueViewerComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
