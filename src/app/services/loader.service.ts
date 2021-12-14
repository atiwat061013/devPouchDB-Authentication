import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader: any;
  constructor(private loadCtrl: LoadingController) { }

  async showLoader() {
    this.loader = await this.loadCtrl.create({
      message: 'กรุณารอสักครู่ระบบกำลังประมวณผล...',
    });
    await this.loader.present();
  }

  hideLoader() {
    // console.log("[service] loader ==>", this.loader);
    this.loader.dismiss();
    this.loader = null;
  }
}
