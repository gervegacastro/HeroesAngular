import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.models';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  hero : Hero = {};
  fromUrl! : any;

  constructor( private activatedRoute : ActivatedRoute, 
               private heroesService : HeroesService,
               private router : Router) {                
    
    const navigation = this.router.getCurrentNavigation();
    if ( navigation && navigation.extras.state) {
      this.fromUrl = navigation.extras.state['from'];       
    }    

    this.activatedRoute.params.subscribe( param => {      
      let gethero = this.heroesService.getHero(param['id']);
      if (gethero) {
        this.hero = gethero;
      }      
    });
  }

  update( id : number, name : string ) {
    const updateHero = this.heroesService.updateHero( id, name );    
    if (updateHero) {
      this.hero = updateHero;
    }
    this.router.navigate([this.fromUrl]);    
  }

  goBack() {
    this.router.navigate([this.fromUrl]);
    this.heroesService.fromDetailtoMessage();
  }

}
