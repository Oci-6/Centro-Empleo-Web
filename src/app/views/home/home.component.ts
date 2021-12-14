import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import {PanelModule} from 'primeng/panel';
import { Novedad } from 'src/app/models/Novedad';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  responsiveOptions: [{
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }] = [{
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }]
  constructor(
    public authService: AuthService,
    private novedadService: NovedadService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  novedades: Novedad[] = [];

  ngOnInit() {
    this.novedadService.ultimasNovedades().subscribe(
      response => {
        this.novedades = response;
      })

    
  }
}
