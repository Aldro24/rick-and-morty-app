import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetallePersonajeComponent } from './components/detalle-personaje-component/detalle-personaje-component';
import { TablaPersonajesComponent } from './components/tabla-personajes-component/tabla-personajes-component';
import { TotalesComponent } from './components/totales-component/totales-component';
import { Header } from './components/header/header';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterModule, DetallePersonajeComponent, TablaPersonajesComponent, TotalesComponent, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('prueba-tecnica');
  personajeActual: any=null;
  
  verDetalle(personaje: any ){
    this.personajeActual=personaje;
  }
  @Input()
  personajesCount: number =0
  todosPersonajes: any[] = [];
  personajes: any[]=[];
  personajesOriginal: any[]=[];

  pageSize: number= 15;
  currentPage: number = 1;


  constructor(private api:Api){}

  ngOnInit() {
    this.cargarPersonajes();
  }

  async cargarPersonajes(){
    let allCharacters: any []=[];
    let page=1;
    let totalPages=1;

    do{
      const res:any = await this.api.getPersonajes({page}).toPromise();
      allCharacters = [...allCharacters,...res.results];
      totalPages= res.info.pages;
      page++;
    } while (page <= totalPages);
    allCharacters.sort((a, b) => a.name.localeCompare(b.name));
    this.todosPersonajes = [...allCharacters]; 
    this.personajesOriginal=[...allCharacters];
    this.currentPage = 1;
    this.actualizarPaginacion();
  }
  aplicarFiltros(filtros:any){
    let filtrados = [...this.todosPersonajes];
    if(filtros.name){
      filtrados = filtrados.filter (p=>
        p.name.toLowerCase().includes(filtros.name.toLowerCase())
      );
    }
    if(filtros.species){
      filtrados = filtrados.filter (p=>
        p.species.toLowerCase().includes(filtros.species.toLowerCase())
      );
    }
    this.personajesOriginal=filtrados;
    this.currentPage = 1;
    this.actualizarPaginacion();
    
  }

  actualizarPaginacion(){
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.personajes = this.personajesOriginal.slice(start,end);
  }

  cambiarPagina(delta:number){
    this.currentPage +=delta;

    if(this.currentPage < 1) this.currentPage = 1 ;
    if(this.currentPage > this.totalPages) this.currentPage = this.totalPages ;
    this.actualizarPaginacion();
  }

  get totalPages(): number {
    return Math.ceil(this.personajesOriginal.length / this.pageSize)
  }

  getTotalesPorAtributo(attr: string): {[key: string]: number}{
const totales:{[key: string]: number}= {};
for (const p of this.personajesOriginal) {
  const key = p[attr] || 'Desconocido'
;
if (totales[key]){
  totales[key]++;
} else {
  totales[key]= 1;
}

  }
 return totales;

}
}


