import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

const USER_KEY='user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
     private userSubject = new BehaviorSubject<User> (this.getLocalStorage());//(new User());
     public userObervable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) { 
    this.userObervable =this.userSubject.asObservable();
  }

  login (userLogin: IUserLogin):Observable<User>  {
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
            this.setLocalStorage(user);
            this.toastrService.success(`Welcome to FoodLover ${user.name}!`,
            'Login Successful')
        },
        error:(errorResonse) =>{
            this.toastrService.error(errorResonse.error, 'Login Failed!')
        }
      })
    );
  }
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
private setLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
}
private getLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
}
}
