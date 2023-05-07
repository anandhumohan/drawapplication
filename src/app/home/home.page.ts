import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private alertController: AlertController, private http: HttpClient) {}

  async onPlusButtonClick() {
    const alert = await this.alertController.create({
      header: 'Enter Project Name',
      inputs: [
        {
          name: 'projectName',
          type: 'text',
          placeholder: 'Project Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: async (data) => {
            if (data.projectName) {
              // Save the project name to the Fuseki server
              await this.saveProject(data.projectName);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async saveProject(projectName: string) {
    const uniqueId = Date.now();
    const fusekiUrl = 'http://localhost:3030/knowledge/update'; // Replace with your Fuseki server's update URL

    const updateQuery = `
      PREFIX : <http://www.indigenousknowledge.org/anandhu/ontologies/>
      INSERT DATA {
        :Parent_Node_${uniqueId} a :Parent_Node ;
          :id "${uniqueId}" ;
          :title "${projectName}" .
      }
    `;

    const response = await this.http.post(fusekiUrl, { update: updateQuery }).toPromise();
    console.log('Project saved:', response);
  }
}
