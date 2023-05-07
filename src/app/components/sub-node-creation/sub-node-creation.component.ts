import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';




@Component({
  selector: 'app-sub-node-creation',
  templateUrl: './sub-node-creation.component.html',
  styleUrls: ['./sub-node-creation.component.scss'],
})
export class SubNodeCreationComponent implements OnInit {
  capturedImage: string | undefined;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.capturedImage = image.webPath;
    // Do something with the captured image, for example, display it on the page
    console.log(image.webPath);
  }

  pickImage() {
    // Pick image logic here
  }

  captureFilm() {
    // Capture film logic here
  }

  captureSound() {
    // Capture sound logic here
  }

  getFile() {
    // Get file logic here
  }

  getCanvas() {
    // Get canvas logic here
  }

  getEditor() {
    // Get editor logic here
  }

  saveFile() {
    // Save file logic here
  }

}
