import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePipe } from './pipe/delete.pipe';
import { RolePipe } from './pipe/role.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DeletePipe,
    RolePipe
  ],
  exports: [
    DeletePipe,
    RolePipe
  ]
})
export class SharedModule { }
