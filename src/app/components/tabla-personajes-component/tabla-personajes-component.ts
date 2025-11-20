import { Component, EventEmitter, Input, OnInit, output } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Output } from '@angular/core';

@Component({
  selector: 'app-tabla-personajes-component',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './tabla-personajes-component.html',
  styleUrls: ['./tabla-personajes-component.css'],
})
export class TablaPersonajesComponent implements OnInit {
@Input()
  personajes: any[]=[];
constructor(private api:Api){}

ngOnInit(){
  this.api.getPersonajes().subscribe((res:any)=> {
      this.personajes = res.results;
    })
}

@Output() 
personajesSeleccionado=new EventEmitter();
seleccionar(personaje:any){
  this.personajesSeleccionado.emit(personaje)
}



}
