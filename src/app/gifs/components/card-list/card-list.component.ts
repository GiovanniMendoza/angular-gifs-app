import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  //public cardlist: string[] = {'',''};

  @Input()
  public gifs: Gif[] = [];

}
