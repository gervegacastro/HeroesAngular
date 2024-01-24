import { ChangeDetectorRef, Component } from '@angular/core';
import { Message } from 'src/app/models/message.models';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  messages : Message[] = [];

  constructor( private messagesService : MessagesService, 
               private cdr : ChangeDetectorRef ) {
                this.messagesService.messagesUpdates.subscribe( updateMessages => {
                  this.messages = updateMessages;
                  this.cdr.detectChanges();
                  });
  }

  getMessages() {
    return this.messagesService.getMessages();   

  }

  deleteMessages() {
    this.messagesService.deleteMessages();
    this.messages = [];    
  }

}
