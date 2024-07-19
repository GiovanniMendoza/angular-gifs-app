import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
//el root hace  referencia que el servicio estara disponible en toda la aplicacion
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private GIPHY_API_KEY: string = 'ZpU2u8yeLYnU311VtXZRDJ5F26I9lB89';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gif Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];//Expression expected es para crear una copia del _tagsHistory
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();//convirtiendo en minuscula

    if (this._tagsHistory.includes(tag)) {//verificando si el parametro tag existe en el arreglo
      //filtra solo los valores que sean diferente, removiendo al que sea igual
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag)//agregando el tag al arreglo
    this._tagsHistory = this.tagsHistory.splice(0, 10);//limita el arreglo a 10 registros

    this.saveLocalStorage();
  }

  //ALMACENA EL HISTORIAL DE BUSQUEDA EN EL LOCAL STORAGE y lo CONVIERTE EN STRING
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  //CARGAR EL LOCAL STORAGE
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  //async searchTag(tag: string): Promise<void> {
  public searchTag(tag: string): void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    console.log(this._tagsHistory);

    /**fetch('https://api.giphy.com/v1/gifs/search?api_key=ZpU2u8yeLYnU311VtXZRDJ5F26I9lB89&q=valorant&limit=5')
    .then( resp => resp.json())
    .then( data => console.log(data));**/

    /**const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=ZpU2u8yeLYnU311VtXZRDJ5F26I9lB89&q=valorant&limit=5');
    const data = await resp.json();
    console.log(data)**/

    const params = new HttpParams()
      .set('api_key', this.GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;
        //console.log({ gifs: this.gifList });

      })


  }



}
