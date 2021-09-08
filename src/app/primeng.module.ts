import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//PrimeImports
import {MenubarModule} from 'primeng/menubar';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    MenubarModule,
    CarouselModule,
    ButtonModule,
    CardModule,
    PanelModule,
    AvatarModule,
    AvatarGroupModule,
    PanelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    DividerModule,
    DialogModule,
    InputTextModule,
  ],
  exports: [    
    MenubarModule,
    CarouselModule,
    ButtonModule,
    CardModule,
    PanelModule,
    AvatarModule,
    AvatarGroupModule,
    PanelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    DividerModule,
    DialogModule,
    InputTextModule,
  ]
})
export class PrimeNgModule { }