import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
    >
  `
})

export class searchBoxComponent {
  constructor() { }

  //toma una referencia local en este caso el txtTagInput
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;//el signo '!' indica que siempre va tener un valor

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    console.log({ newTag })
  }

}
