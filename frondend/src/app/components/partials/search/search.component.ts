import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, ParamMap, Router, RoutesRecognized } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  constructor(activatedRoute:ActivatedRoute,private router:Router) {
    activatedRoute.params.subscribe(params => {
      console.log("paramSearchPath: " + params.searchTerm);
      if(params.searchTerm) this.searchTerm = params.searchTerm;
      });
   }

  ngOnInit(): void {
  }

  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+ term);
    else
    this.router.navigateByUrl('/');
  }
}
