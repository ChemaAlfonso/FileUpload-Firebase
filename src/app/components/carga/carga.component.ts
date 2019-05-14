import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';

import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  mouseSobreElemento: boolean = false;

  constructor( public _cargaImagenesService: CargaImagenesService ) { }

  ngOnInit() {
  }

  cargarImagenes(){
    this._cargaImagenesService.cargarImagenesFirebase( this.archivos );
  }

  prueba($event){
    console.log($event);
  }
  
  limpiarArchivos(){
    this.archivos = [];
  }

}
