import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  projects: { id: string; title: string }[] = [];
  constructor(private alertController: AlertController, private http: HttpClient, private router: Router) {}

  onProjectNodeClick(projectId: string) {
    this.router.navigate(['/next-page', { projectId }]); // Replace '/next-page' with your actual route
  }
  onProjectClick(project: { id: string; title: string }) {
    this.router.navigate(['/project-view', project.id]);
  }

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
              try {
                await this.saveProject(data.projectName);
                // Close the alert if successful
                alert.dismiss();
              } catch (error) {
                // Display an inline error message if there's an error
                const errorMessageElement = document.createElement('p');
                errorMessageElement.style.color = 'red';
                errorMessageElement.textContent = 'Error: Failed to save the project';
                alert.message = '';
                alert.appendChild(errorMessageElement);
              }
            }
          },
        },
      ],
    });
  

    await alert.present();
  }

  async saveProject(projectName: string) {
    const uniqueId = Date.now();
    const idString = uniqueId.toString();
    const fusekiUrl = 'http://localhost:3030/knowledge/update'; // Replace with your Fuseki server's update URL
  
    const updateQuery = `
      PREFIX : <http://www.indigenousknowledge.org/anandhu/ontologies/>
      INSERT DATA {
        :Parent_Node_${uniqueId} a :Parent_Node ;
          :id "${uniqueId}" ;
          :title "${projectName}" .
      }
    `;
  
    try {
      const response$ = this.http
        .post(fusekiUrl, updateQuery, {
          headers: {
            'Content-Type': 'application/sparql-update',
          },
          observe: 'response',
        });
      const response = await firstValueFrom(response$);
      const project = { id: idString, title: projectName };
      this.projects.push(project);
      console.log('Project saved:', response);
    } catch (error) {
      console.error('Error saving project:', error);
      throw new Error('Failed to save project');
    }
  }
  
  
  
}
