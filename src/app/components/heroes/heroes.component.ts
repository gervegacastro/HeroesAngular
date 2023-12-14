import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.models';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes : Hero [] = [];

  constructor( private heroesService : HeroesService) {   

    this.getHeroes();
  }

  ngOnInit() {      
               
  }

  saveHero(input : string) {
    this.heroesService.saveHero(input);
    }  

  getHeroes() {
    this.heroes = this.heroesService.getHeroes();    
  }

  deleteHero( i : number ) {
    this.heroesService.deleteHero( i );
  }

  goToDetail (heroId : number) {
    this.heroesService.goToDetail( heroId, 'heroes');
  }

}
