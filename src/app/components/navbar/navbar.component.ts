import { Component } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor( private heroesService : HeroesService) {

  }

  fromNavbartoMessage() {
    this.heroesService.fromNavbarToMessage();
  }

  

}
