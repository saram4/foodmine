import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  foods: Food[] = [];
  constructor(private foodService:FoodService, private activatedRoute:ActivatedRoute, router: Router) {
    //console.log('searchTerm: ' + router.url);
    let foodOservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        //this.foods = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
        foodOservable = this.foodService.getAllFoodBySearchTerm(params.searchTerm);

      else if (params.tag)
        //this.foods = this.foodService.getAllFoodsByTag(params.tag);
        foodOservable = this.foodService.getAllFoodsByTag(params.tag);

      else
        //this.foods = foodService.getAll();
        foodOservable = foodService.getAll();

        foodOservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    }) 
  }

  ngOnInit(): void {
    
  }

}
