import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitar-acceso',
  templateUrl: './solicitar-acceso.component.html',
  styleUrls: ['./solicitar-acceso.component.css']
})
export class SolicitarAccesoComponent implements OnInit {

  public accesoForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnSubmit() {
  }
  ngOnInit(): void {
    this.accesoForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
  });
  }

}
