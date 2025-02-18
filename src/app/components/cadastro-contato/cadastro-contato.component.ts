import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class CadastroContatoComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private contatoService: ContatoService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      celular: ['', Validators.required],
      telefone: [''],
      favorito: [false],
    });
  }

  cadastrar() {
    if (this.form.valid) {
      const contato = this.form.value;
      this.contatoService.cadastrar(contato).subscribe(
        () => {},
        (error: Error) => {
          console.error(error);
        }
      );
    }
  }
}
