import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Contato } from '../../models/contato';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { PhonePipe } from '../../pipes/phone.pipes';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css'],
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
    RouterModule,
    PhonePipe,
    PhoneMaskDirective,
  ],
})
export class ContatoDetalheComponent implements OnInit {
  contato?: Contato;
  form: FormGroup;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      contato_nome: ['', Validators.required],
      contato_email: ['', [Validators.email]],
      contato_celular: [
        '',
        [Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      contato_telefone: ['', [Validators.pattern(/^\d{10}$/)]],
      contato_sn_favorito: [false],
      contato_sn_ativo: ['S'],
    });
  }

  ngOnInit(): void {
    this.carregarContato();
  }

  private carregarContato(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(+id)) {
      this.mostrarErro('ID do contato inválido');
      this.router.navigate(['/consulta']);
      return;
    }

    this.contatoService.buscarPorId(+id).subscribe({
      next: (contato) => {
        this.contato = contato;
        this.form.patchValue(contato);
      },
      error: (err) => {
        this.mostrarErro('Falha ao carregar contato');
        console.error(err);
        this.router.navigate(['/consulta']);
      },
    });
  }

  editar(): void {
    this.isEditing = true;
  }

  salvar(): void {
    if (this.form.invalid || !this.contato) return;

    const contatoAtualizado: Contato = {
      ...this.contato,
      ...this.form.value,
    };

    this.contatoService
      .atualizar(this.contato.contato_id, contatoAtualizado)
      .subscribe({
        next: () => {
          this.contato = contatoAtualizado;
          this.isEditing = false;
          this.snackBar.open('Contato atualizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        error: (err) => {
          this.mostrarErro('Falha ao atualizar contato');
          console.error(err);
        },
      });
  }

  async confirmarInativacao(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Inativação',
        message: 'Tem certeza que deseja inativar este contato?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.inativar();
    });
  }

  private inativar(): void {
    if (!this.contato) return;

    this.contatoService.inativar(this.contato.contato_id).subscribe({
      next: () => {
        this.snackBar.open('Contato inativado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/consulta']);
      },
      error: (err) => {
        this.mostrarErro('Falha ao inativar contato');
        console.error(err);
      },
    });
  }

  cancelarEdicao(): void {
    this.isEditing = false;
    this.form.reset(this.contato);
  }

  private mostrarErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
