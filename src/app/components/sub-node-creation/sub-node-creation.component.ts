import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';







@Component({
  selector: 'app-sub-node-creation',
  templateUrl: './sub-node-creation.component.html',
  styleUrls: ['./sub-node-creation.component.scss'],
})
export class SubNodeCreationComponent implements OnInit {
  @Output() subNodeCreated = new EventEmitter<any>();
  @Input() projectTitle: string | undefined;
  knowledgeResourceType: string | undefined;
  subNodeTitle: string | undefined;
  capturedImage: string | undefined;
  knowledgeResourcePath: string | undefined;

  constructor(private modalController: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  async captureImage() {
    this.knowledgeResourceType = 'image';
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.capturedImage = image.dataUrl;
    if (image.dataUrl) {
      //this.knowledgeResourcePath = await this.saveImage(image.dataUrl);
    } else {
      // Handle the case when image.dataUrl is undefined
      console.error('Image data URL is undefined');
    }
    //this.knowledgeResourcePath = image.imagePath;
    // Do something with the captured image, for example, display it on the page
    console.log(image.webPath);
  }
/*
  async saveImage(imageData: string) {
    const imageName = `image-${Date.now()}.jpg`;
    await this.storage.set(imageName, imageData);
    const imagePath = await this.storage.get(imageName);
    return imagePath;
  }*/

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

  async createSubNode() {
    console.log("createSubNode is called");
    const uniqueId = Date.now();
    const idString = uniqueId.toString();
    const subNodeData = {
      id: uniqueId, // Replace with the actual unique ID
      title: this.subNodeTitle, // Assuming you have a title property bound to the input field
      knowledge_resource_type: this.knowledgeResourceType, // Set this value based on the selected media type
      knowledge_resource_path: this.knowledgeResourcePath, // Replace with the appropriate path depending on the media type
      parent_id: this.projectTitle, // Replace with the actual parent node ID
    };
    console.log('Subnode data:', subNodeData);
    // SPARQL query to insert the subnode data
    const query = `
  PREFIX your_prefix: <http://www.indigenousknowledge.org/anandhu/ontologies/>
  INSERT DATA {
    your_prefix:${subNodeData.id} a your_prefix:Sub_Node ;
      your_prefix:title "${subNodeData.title}" ;
      your_prefix:knowledge_resource_type "${subNodeData.knowledge_resource_type}" ;
      your_prefix:knowledge_resource_path "${subNodeData.knowledge_resource_path}" ;
      your_prefix:parent_id "${subNodeData.parent_id}" ;
      your_prefix:hasChildNode your_prefix:${subNodeData.parent_id} .
  }
`;

const fusekiEndpoint = 'http://localhost:3030/knowledge/update';
const headers = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded' // Set the content type header
});

try {
  await this.http.post(fusekiEndpoint, 'update=' + encodeURIComponent(query), { headers }).toPromise();
  // If the API call is successful, emit the event with the new subnode data
  this.subNodeCreated.emit(subNodeData);
  this.dismiss();
} catch (error) {
  console.error('Error creating subnode:', error);
}

  }

}
