import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  
  constructor() { }

  ngOnSubmit() {
    
}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
    });
}

}
