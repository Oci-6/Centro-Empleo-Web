import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//PrimeImports
import {MenubarModule} from 'primeng/menubar';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';

@NgModule({
  imports: [
    MenubarModule,
    CarouselModule,
    ButtonModule,
    CardModule,
  ],
  exports: [    
    MenubarModule,
    CarouselModule,
    ButtonModule,
    CardModule,
  ]
})
export class PrimeNgModule { }