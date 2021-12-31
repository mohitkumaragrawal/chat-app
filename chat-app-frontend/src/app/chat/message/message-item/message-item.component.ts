import { Component, Input } from '@angular/core';
import { Message } from '../../message.model';

@Component({
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  selector: 'app-message-item',
})
export class MessageItemComponent {
  @Input()
  message: Message;
}
