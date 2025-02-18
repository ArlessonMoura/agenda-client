import { Contato } from './../../models/contato';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ContatoService } from '../../services/contato.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { PhonePipe } from '../../pipes/phone.pipes';

@Component({
  selector: 'app-consulta-contato',
  templateUrl: './consulta-contato.component.html',
  styleUrls: ['./consulta-contato.component.css'],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    // PhonePipe,
  ],
})
export class ConsultaContatoComponent implements OnInit {
  contatos: Contato[] = [];
  contatosFiltrados: Contato[] = [];
  gridCols: number = 3;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize: number = 10;
  pageIndex: number = 0;
  totalItems: number = 0;

  constructor(
    private contatoService: ContatoService,
    private _snackBar: MatSnackBar
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridCols((event.target as Window).innerWidth);
  }

  ngOnInit() {
    this.carregarContatos();
  }

  carregarContatos() {
    this.contatoService.listar().subscribe(
      (contatos) => {
        this.contatos = contatos;
        this.contatosFiltrados = contatos;
        this.totalItems = contatos.length;
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterValueLower = filterValue.toLowerCase();

    this.contatosFiltrados = this.contatos.filter((contato) => {
      const nome = contato.contato_nome
        ? contato.contato_nome.toLowerCase()
        : '';
      const celular = contato.contato_celular
        ? contato.contato_celular.toLowerCase()
        : '';

      return (
        nome.includes(filterValueLower) || celular.includes(filterValueLower)
      );
    });

    this.pageIndex = 0;
    this.paginator.firstPage();
  }

  deleteContact(id: number) {
    this.contatoService.inativar(id).subscribe(
      () => {
        this.carregarContatos();
        this._snackBar.open('Contato inativado com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Erro ao inativar contato:', error);
        this._snackBar.open('Erro ao inativar contato!', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  private updateGridCols(width: number) {
    if (width <= 600) this.gridCols = 1;
    else if (width <= 960) this.gridCols = 2;
    else this.gridCols = 3;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
