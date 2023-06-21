import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../musica.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {
  musicas: any[] = [];
  currentItem: any = {};
  musicaForm!: FormGroup;
  constructor(private musicaService: MusicaService) { }

  ngOnInit(): void {
    this.getItems();
    this.initializeForm();
  }

  getItems(): void {
    this.musicaService.getItems()
      .subscribe((items) => {
        this.musicas = items;
      });
  }

  getItemById(id: string): void {
    this.musicaService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  createItem(item: any): void {
    this.musicaService.createItem(item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        Swal.fire('Success', 'Registro agregado correctamente', 'success');
      });
  }

  updateItem(id: string, item: any): void {
    this.musicaService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        Swal.fire('Success', 'Registro actualizado correctamente', 'success');
      });
  }

  deleteItem(id: string): void {
    Swal.fire({
      title: 'Confirmar Eliminación',
      text: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.musicaService.deleteItem(id)
          .subscribe(() => {
            this.getItems();
            Swal.fire('Success', 'Registro eliminado correctamente', 'success');
          });
      }
    });
  }
  

  editItem(id: string): void {
    this.getItemById(id);
    this.musicaForm.patchValue(this.currentItem);
  }

  initializeForm(): void {
    this.musicaForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      valoracion: new FormControl('', Validators.required),
      genero:  new FormControl('', Validators.required),
    });
  }
}
