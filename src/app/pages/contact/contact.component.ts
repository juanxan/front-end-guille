import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ContactService } from 'src/app/shared/services/contact.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formularioContact = this.fb.group({
    nombre: ['',[Validators.required]],
    correo: ['',[Validators.required, Validators.maxLength(300)]],
    telefono: ['',[Validators.required, Validators.maxLength(300)]],
    mensaje: ['',[Validators.required, Validators.maxLength(300)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly contactService: ContactService,

  ){}

    sendContact(){
      this.contactService.postPedido(this.formularioContact.value).subscribe({
        next: (oResp)=>{
          console.log(oResp);
        },
        error: (oErro)=>{
          console.log(oErro);
        }
      })
    }
    
}
