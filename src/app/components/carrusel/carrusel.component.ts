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
    this.images = ["https://cherie.com.uy/wp-content/uploads/2020/06/placeholder-1.png", "https://cherie.com.uy/wp-content/uploads/2020/06/placeholder-1.png"];
  }

}
