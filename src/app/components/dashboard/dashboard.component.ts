import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.models';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes : Hero[] = []; 
  suggestionList : Hero[] = []; 

  constructor( private heroesService : HeroesService,
               private router : Router) {    

  }
  ngOnInit() {
    this.getHeroes();    
  }

  getHeroes() {
    this.heroes = this.heroesService.getHeroes();   
   
  }

  goToDetail(heroId : number) {
    this.heroesService.goToDetail( heroId, 'dashboard');
  }

  search ( input : string) { 
    this.suggestionList = [];
    this.suggestionList = this.heroesService.search( input );      
    
  }

}
