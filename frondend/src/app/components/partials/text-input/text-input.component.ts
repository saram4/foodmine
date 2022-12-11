import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
@Input()
label!:string
@Input()
showErrorsWhen: boolean =true;
@Input()
control!: AbstractControl;
@Input()
type: 'text' | 'email' | 'password' ='text';

get formControl(){
  return this.control as FormControl;
}
  constructor() { }

  ngOnInit(): void {
  }

}
