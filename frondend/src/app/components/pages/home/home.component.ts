import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
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
   
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        this.foods = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
      else if (params.tag)
        this.foods = this.foodService.getAllFoodsByTag(params.tag);
      else
        this.foods = foodService.getAll();
    }) 
  }

  ngOnInit(): void {
    
  }

}
