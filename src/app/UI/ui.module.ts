import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from "@angular/router";
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent, InputComponent, ButtonComponent]
})
export class UIModule { }
