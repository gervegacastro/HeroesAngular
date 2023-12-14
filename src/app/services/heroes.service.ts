import { EventEmitter, Injectable } from '@angular/core';
import { Hero } from '../models/hero.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes : Hero[] = [];  
  private timeOut : any;
  heroAdded : EventEmitter<any> = new EventEmitter<any>();
  heroDeleted : EventEmitter<any> = new EventEmitter<any>();
  heroFetched : EventEmitter<any> = new EventEmitter<any>();
  heroFetchedId : EventEmitter<any> = new EventEmitter<any>();
  heroFound : EventEmitter<any> = new EventEmitter<any>();
  noHeroFound : EventEmitter<any> = new EventEmitter<any>();
  heroUpdate : EventEmitter<any> = new EventEmitter<any>();

  constructor(private router : Router) {       
             
  }

  saveHero( input : string) {
    let maxId = 0;
    for (let hero of this.heroes) {
      if ( hero && hero.id! >= maxId) {
        maxId = hero.id!;
      }
    }
    const id = maxId + 1;    
    const newHero = new Hero(id, input);    
    localStorage.setItem('Hero_' + id, JSON.stringify(newHero));   
    this.heroes.push(newHero);  
    this.heroAdded.emit(newHero.id);              
  }

  getHero( id : number) {
    let heroSearch;        
    for ( let hero of this.heroes) {
      if ( hero.id == id) 
      heroSearch = hero;
    }
    return heroSearch;
  }
  
  getHeroes() {   
    this.heroes = []; 
    for (let i = 0; i < localStorage.length; i = i + 1) {
      let key = localStorage.key( i );
      if (key && key.startsWith( 'Hero_' )) {
        let heroSring = localStorage.getItem(key);
        if (heroSring) {
          let hero = JSON.parse(heroSring);
          this.heroes.push( hero );
        }        
      }
    }
    return this.heroes;
  }

  updateHero( id : number, name : string ) {  
    let updateHero;      
    for (let hero of this.heroes) {
      if ( hero.id == id) {
        updateHero = hero;
        updateHero.name = name;
        localStorage.setItem( 'Hero_' + hero.id, JSON.stringify( updateHero )); 
        this.heroUpdate.emit( id );       
      }
    }
    return updateHero;    
  }

  deleteHero( i : number) {    
    let hero = this.heroes[i];
    localStorage.removeItem('Hero_' + hero.id);
    this.heroes.splice( i, 1 ); 
    this.heroDeleted.emit(hero.id); 
  }

  search( input : string) {
    if (!input.trim()) {      
      clearTimeout(this.timeOut);
      return[];
    }
    clearTimeout(this.timeOut);

    const suggestionList : Hero[] = [];
    
    this.timeOut = setTimeout(() => {
      
      for ( let hero of this.heroes ) {
        if ( hero.name?.includes(input) ) {
         suggestionList.push(hero);
         this.heroFound.emit(input);                  
        } else {
          this.noHeroFound.emit(input);
        }
      }      
    }, 1500); 

    return suggestionList;

  }

  goToDetail( heroId : number, from : string) {
    const route = ['/detail', heroId];
    const url = { state: { from : from } };
    this.router.navigate( route, url);
    this.heroFetchedId.emit(heroId);
  }

  fromNavbarToMessage() {
    this.heroFetched.emit();
  }

  fromDetailtoMessage() {
    this.heroFetched.emit();
  }

  
  
}
