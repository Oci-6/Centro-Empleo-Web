import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Social Logins
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HomeComponent } from './views/home/home.component';
import { PrimeNgModule } from './primeng.module';
import { PostulantesComponent } from './views/postulantes/postulantes.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { MisPostulacionesComponent } from './views/postulante/mis-postulaciones/mis-postulaciones.component';
import { PerfilComponent } from './views/postulante/perfil/perfil.component';
import { LoginComponent } from './views/login/login.component';
import { RegistrarComponent } from './views/registrar/registrar.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { NovedadesComponent } from './views/novedades/novedades.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostulantesComponent,
    MenuComponent,
    NavbarComponent,
    CarruselComponent,
    MisPostulacionesComponent,
    PerfilComponent,
    LoginComponent,
    RegistrarComponent,
    OfertasComponent,
    NovedadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //PrimeImports
    PrimeNgModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '811112997489-6gbrihariesa3h7pbcrpbtr8qfm13l4i.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1007582456710652')
        }
      ]
    } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
