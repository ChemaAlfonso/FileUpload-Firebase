import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private items: Observable<any[]>;
  private PATH_IMG = 'img';

  constructor(private db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

  cargarImagenesFirebase( imagenes: FileItem[] ){
    const storageRef = firebase.storage().ref();

    for (const item of imagenes){
      item.uploading = true;

      if (item.progress >= 100){
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =  storageRef.child(`${ this.PATH_IMG}/${ item.nombreArchivo }`)
                                                                 .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
              ( snapshot ) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              ( error ) => console.error( 'Error al subir', error),
              () => {
                console.log('Imagen cargada con éxito');
                uploadTask.snapshot.ref.getDownloadURL().then( (downloadUrl) => {
                  item.url = downloadUrl;
                  item.uploading = false;
                  
                  this.guardarImagen({
                    nombre: item.nombreArchivo,
                    url: item.url
                  });

                });
              }
        
        )
    }
  }

  private guardarImagen( imagen: { nombre: string, url: string } ){
    this.db.collection(`/${this.PATH_IMG}`)
        .add( imagen );
  }

}
