import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    CommonModule
  ],
  entryComponents: [AlertComponent],
  providers: []
})
export class SharedModule {}