import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    // return sample_foods;
    return   this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodBySearchTerm(searchTerm: string){
    //return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }
  getAllTags(): Observable<Tag[]>{
    //return sample_tags;
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }
  getAllFoodsByTag(tag: string):Observable<Food[]>{
    console.log('Tag: ', tag);
    return tag =="All"?
    this.getAll() :
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
     // this.getAll().filter(food => food.tags?.includes(tag))

  }
  getFoodById(foodId:string):Observable<Food>{
    //return this.getAll().find(food => food.id == foodId) ?? new Food();
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
