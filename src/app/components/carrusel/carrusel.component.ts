import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  
  images: string[] = [];

  constructor() {}

  ngOnInit() {
    this.images = ["http://c.files.bbci.co.uk/17D60/production/_111223679_coronathumbweb.jpg", "http://c.files.bbci.co.uk/17D60/production/_111223679_coronathumbweb.jpg"];
  }

}
