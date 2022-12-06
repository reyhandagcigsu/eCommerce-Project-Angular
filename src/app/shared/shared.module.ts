import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    LoadingSpinnerComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  exports: [
    FilterPipe,
    HeaderComponent,
    LoadingSpinnerComponent,
    FormsModule
  ]
})
export class SharedModule { }
