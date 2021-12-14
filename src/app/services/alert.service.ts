import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async presentAlert(title: any, msg: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-ibci',
      header: title,
      message: msg,
      buttons: ['ตกลง']
    });

    return await alert.present();
  }
}
