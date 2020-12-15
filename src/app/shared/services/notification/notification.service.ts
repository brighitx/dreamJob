import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  open = (action: string) => {
    switch (action) {
      case 'delete': {
        this.openSnackBar('Participante eliminado', 'Cerrar');
        break;
      }
      case 'create': {
        this.openSnackBar('Participante creado', 'Cerrar');
        break;
      }
      case 'update': {
        this.openSnackBar('Participante actualizado', 'Cerrar');
        break;
      }
      case 'emailexist': {
        this.openSnackBar('Ese correo electrónico ya esta en uso', 'Cerrar');
        break;
      }
      case 'passworderror': {
        this.openSnackBar('La contraseña es incorrecta', 'Cerrar');
        break;
      }
      case 'accountnoexist': {
        this.openSnackBar('No existe una cuenta con ese correo electrónico', 'Cerrar');
        break;
      }
      case 'sendPasswordResetEmail': {
        this.openSnackBar('Correo enviado correctamente para restablecer contraseña', 'Cerrar');
        break;
      }
      case 'updatePassword': {
        this.openSnackBar('Contraseña cambiada correctamente', 'Cerrar');
        break;
      }
      case 'updateProfile': {
        this.openSnackBar('Datos cambiados correctamente', 'Cerrar');
        break;
      }
      case 'loginagain': {
        this.openSnackBar('Necesitas iniciar sesión nuevamente para realizar este cambio', 'Cerrar');
        break;
      }
      case 'uploadImage': {
        this.openSnackBar('Imagen cambiada correctamente', 'Cerrar');
        break;
      }
      case 'createOffer': {
        this.openSnackBar('Oferta creada correctamente', 'Cerrar');
        break;
      }
      case 'deleteOffer': {
        this.openSnackBar('Oferta eliminada correctamente', 'Cerrar');
        break;
      }
      case 'addCandidate': {
        this.openSnackBar('Se ha inscrito a esta oferta correctamente', 'Cerrar');
        break;
      }
    }
  }
}
