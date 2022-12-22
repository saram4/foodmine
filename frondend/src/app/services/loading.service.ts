import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

private isloadingSubject = new BehaviorSubject<boolean>(false);
  
  constructor() { 

  }

  showLoading(){
    this.isloadingSubject.next(true);
  }
  hideLoading(){
    this.isloadingSubject.next(false);
  }
  get isLoading(){
    return  this.isloadingSubject.asObservable();
  }
}
