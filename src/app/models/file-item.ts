export class FileItem{
    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public uploading: boolean;
    public progress: number;

    constructor( archivo: File ){
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        this.uploading = false;
        this.progress = 0;
    }
}