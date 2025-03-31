import { Component } from '@angular/core';
import {onExit} from'./../../../guards/exit.guard';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements onExit {
  constructor() { }

  onExit(){
    const rta= confirm('¿Estás seguro de salir?');
    return rta;
  }
}
