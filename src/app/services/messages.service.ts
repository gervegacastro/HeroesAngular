import { EventEmitter, Injectable } from '@angular/core';
import { HeroesService } from './heroes.service';
import { Message } from '../models/message.models';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages : Message[] = []; 
  messagesUpdates : EventEmitter<Message[]> = new EventEmitter<Message[]>();
  

  constructor( private heroesService : HeroesService ) { 

    this.heroesService.heroAdded.subscribe( heroId => {
      this.saveMessageOfAddHero(heroId);  
      this.emitMessagesUpdates();            
    });

    this.heroesService.heroDeleted.subscribe( heroId => {
      this.saveMessageOfDeleteHero(heroId);
      this.emitMessagesUpdates();
    });

    this.heroesService.heroFetched.subscribe( () => {
      this.saveMessageOfFetchedHero();
      this.emitMessagesUpdates();
    });

    this.heroesService.heroFetchedId.subscribe( heroId => {
      this.saveMessageOfFetchedHeroId( heroId );
      this.emitMessagesUpdates();
    });

    this.heroesService.heroFound.subscribe( input => {
      this.saveMessageOfHeroFound( input );
      this.emitMessagesUpdates();
    });

    this.heroesService.noHeroFound.subscribe( input => {
      this.saveMessageOfNoHeroFound( input );
      this.emitMessagesUpdates();
    });

    this.heroesService.heroUpdate.subscribe( id => {
      this.saveMessageOfHeroUpdate( id );
      this.emitMessagesUpdates();
    })

  }

  saveMessageOfAddHero( heroId : number) {        
    const newMessage  = new Message( this.messageId(), 'added hero w/ id=' + heroId );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );        
  }

  saveMessageOfDeleteHero( heroId : number) {
    const newMessage = new Message( this.messageId(), 'deleted hero id=' + heroId );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );
  }

  saveMessageOfFetchedHero() {
    const newMessage = new Message( this.messageId(), 'fetched heroes' );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );
  }

  saveMessageOfFetchedHeroId( heroId : number) {
    const newMessage = new Message( this.messageId(), 'fetched hero id=' + heroId );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );
  }

  saveMessageOfHeroFound( input : string) {
    const newMessage = new Message( this.messageId(), 'found heroes matching ' + input );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );
  }

  saveMessageOfNoHeroFound( input : string) {
    const newMessage = new Message( this.messageId(), 'no heroes matching ' + input );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );
  }

  saveMessageOfHeroUpdate ( id : number ) {
    const newMessage = new Message( this.messageId(), 'update hero id=' + id );
    localStorage.setItem( 'Message_' + newMessage.id, JSON.stringify( newMessage ));
    this.messages.push( newMessage );
  }

  getMessages() {
    this.messages  = [];
    for (let i = 0; i < localStorage.length; i = i + 1) {
      let key = localStorage.key( i );
      if (key && key.startsWith( 'Message_' )) {
        let messageSring = localStorage.getItem( key );
        if ( messageSring ) {
          let message = JSON.parse( messageSring );
          this.messages.push( message );
        }        
      }
    }
    return this.messages;
 
  }

  deleteMessages() {
    localStorage.removeItem('Message_');
    this.messages = [];
  }

  private emitMessagesUpdates () {
    this.messagesUpdates.emit([...this.messages]);
  }

   private messageId() {    
    let maxId = 0;
    for (let message of this.messages) {
      if ( message && message.id! >= maxId ) {
        maxId = message.id! + 1;
      }
    }
    return maxId;    
  }

  
}
