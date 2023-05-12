import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';








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
      this.knowledgeResourcePath = await this.saveImage(image.dataUrl);
    } else {
      // Handle the case when image.dataUrl is undefined
      console.error('Image data URL is undefined');
    }
    // Do something with the captured image, for example, display it on the page
    console.log(image.webPath);
  }
  async saveImage(imageData: string) {
    const imageName = `image-${Date.now()}.jpg`;
    await this.storeInIndexedDB(imageName, imageData);
    return imageName;
  }

  async storeInIndexedDB(imageName: string, imageData: string) {
    const dbName = 'ImageDB';
    const storeName = 'Images';
  
    return new Promise(async (resolve, reject) => {
      const openRequest = indexedDB.open(dbName);
  
      openRequest.onupgradeneeded = function () {
        const db = openRequest.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
  
      openRequest.onsuccess = function () {
        const db = openRequest.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
  
        const putRequest = store.put(imageData, imageName);
  
        putRequest.onsuccess = function () {
          resolve(putRequest.result);
        };
  
        putRequest.onerror = function () {
          reject(putRequest.error);
        };
      };
  
      openRequest.onerror = function () {
        reject(openRequest.error);
      };
    });
  }

  async getImageFromIndexedDB(imageName: string) {
    const dbName = 'ImageDB';
    const storeName = 'Images';
  
    return new Promise(async (resolve, reject) => {
      const openRequest = indexedDB.open(dbName);
  
      openRequest.onsuccess = function () {
        const db = openRequest.result;
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
  
        const getRequest = store.get(imageName);
  
        getRequest.onsuccess = function () {
          resolve(getRequest.result);
        };
  
        getRequest.onerror = function () {
          reject(getRequest.error);
        };
      };
  
      openRequest.onerror = function () {
        reject(openRequest.error);
      };
    });
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
  
  try {
    const response = await this.http.post(fusekiEndpoint, 'update=' + encodeURIComponent(query), { headers, responseType: 'text', observe: 'response' }).toPromise() as HttpResponse<Object>;
  
    if (response.headers.get('Content-Type') === 'application/json') {
      try {
        const jsonResponse = JSON.parse(response.body as string);
        // Handle the JSON response
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    } else {
      const textResponse = response.body as string;
      console.log('Response:', textResponse);
      this.subNodeCreated.emit();
      this.dismiss();
    }
  } catch (error) {
    console.error('Error creating subnode:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
  }
  
  
  


  // If the API call is successful, emit the event with the new subnode data
  

  // Create a new subnode and draw a straight line connecting the nodes
  //this.createNewSubNode();

  
} catch (error) {
  console.error('Error creating subnode:', error);
}


  }

}
