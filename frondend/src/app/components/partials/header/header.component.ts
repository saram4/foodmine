import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
cartQuantity = 0; 
user!:User;
private sub: any =null;
  constructor(private cartService:CartService, private userService:UserService) {
    this.sub = cartService.getCartObservable().subscribe((newCart) =>{
      this.cartQuantity = newCart.totalCount;
    })
      this.sub = userService.userObervable.subscribe((newUser) => {
      this.user = newUser;
    })
   }

  ngOnInit(): void {

  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

  ngOnDestroy() {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
}
}
