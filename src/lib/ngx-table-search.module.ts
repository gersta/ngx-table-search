import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTableSearchPipe } from './ngx-table-search.pipe';
import { NgxTableSearchDirective } from './ngx-table-search.directive';



@NgModule({
  declarations: [
    NgxTableSearchPipe,
    NgxTableSearchDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgxTableSearchPipe,
    NgxTableSearchDirective
  ]
})
export class NgxTableSearchModule { }
