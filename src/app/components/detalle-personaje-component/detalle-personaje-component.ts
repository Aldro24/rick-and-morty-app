import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-personaje-component',
  imports: [CommonModule],
  templateUrl: './detalle-personaje-component.html',
  styleUrl: './detalle-personaje-component.css',
})
export class DetallePersonajeComponent {
@Input() 
personaje: any;

origenDetalle: any = null;
primerEpisodio: any= null;
otroPersonaje: any = null;

constructor(private http: HttpClient){}

 // funcion que trae la informacion del origen del personaje junto con el primer episodio y otro personaje de la misma ubicacion 

ngOnChanges(){
  if(!this.personaje) return;
  
  if(this.personaje.origin?.url){
    this.http.get(this.personaje.origin.url).subscribe(res=> this.origenDetalle=res);
  }
   
  if(this.personaje.episode?.length > 0){
    this.http.get(this.personaje.episode[0]).subscribe(res=>this.primerEpisodio = res);
  }

  if(this.personaje.location?.url){
    this.http.get(this.personaje.location.url).subscribe((loc:any)=> {
      const otros= loc.residents.filter((url:string)=>url !==this.personaje.url)
      if(otros.length > 0){
        this.http.get(otros[0]).subscribe(p => this.otroPersonaje = p);
      }
    })
  }
}

}
