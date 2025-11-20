import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class Api {
  baseUrl= 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient){}
  getPersonajes(filtros: any= {}){
  //  return this.http.get(`${this.baseUrl}/character`);
  let url= `${this.baseUrl}/character/?`;

  Object.keys(filtros).forEach(key=>{
    url += `${key}=${filtros[key]}&`;
  });
    return this.http.get(url);
  
  }
}
