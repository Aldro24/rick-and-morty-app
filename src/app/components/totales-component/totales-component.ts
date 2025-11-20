import { Component, input, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-totales-component',
  imports: [CommonModule],
  templateUrl: './totales-component.html',
  styleUrl: './totales-component.css',
})
export class TotalesComponent {
@Input()
  totalesSpecies: {[key: string]: number} ={};
@Input()
  totalesType: {[key: string]: number} ={};
  objectKeys(obj:any){
    return obj ? Object.keys(obj) : [];
  }
  
}
