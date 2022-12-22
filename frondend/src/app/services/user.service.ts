import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import {IUserRegister} from '../shared/interfaces/IUserRegister';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

const USER_KEY='currentuser';
@Injectable({
  providedIn: 'root'
})
export class UserService {
     private userSubject = new BehaviorSubject<User>(this.getLocalStorage());//(new User());
     public userObervable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) { 
    this.userObervable = this.userSubject.asObservable();
  }

  login (userLogin: IUserLogin):Observable<User>  {
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
            this.setLocalStorage(user);
            //Important line to redirect from login
            //Happy scenario getting the new user from server needs to be updated
            this.userSubject.next(user);
            this.toastrService.success(`Welcome to FoodLover ${user.name}!`,
            'Login Successful')
        },
        error:(errorResonse) =>{
          if (errorResonse.status == 0 )
          {
            this.toastrService.error('Technical Failure. Please try after sometime!!')
          }
          else{
            this.toastrService.error(errorResonse.error, 'Login Failed!')
          }

        }
      })
    );
  }

  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
          next: (user) => {
            this.setLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success(`Welcome foodLover ${user.name}!`,'Register Successfully!')
          },
          error: (errorResponse) =>{
            this.toastrService.error(errorResponse.error,'Registration Failed!')
          }
        
          
      }
    ))
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
