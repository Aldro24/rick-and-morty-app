import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
@Output()
filterschange= new EventEmitter<any>();
filters: {
  [key:string]: string}={
  name: '',
  species: ''
};

onFilterChange(field: string, value:string){
  this.filters[field]= value;
  this.filterschange.emit(this.filters);
}
}
