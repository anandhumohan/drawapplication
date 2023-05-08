import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SubNodeCreationComponent } from '../components/sub-node-creation/sub-node-creation.component';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.page.html',
  styleUrls: ['./project-view.page.scss'],
})
export class ProjectViewPage implements OnInit {
  projectTitle = '';
  showSubNodeCreation = false;

  constructor(private activatedRoute: ActivatedRoute, private alertController: AlertController, private modalController: ModalController) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.projectTitle = params['id']; // This is just an example, you can fetch the title based on the ID from your backend
    });
  }

  onPlusButtonClick() {
    console.log('Plus button clicked');
    // Implement the logic for the plus button click
  }
  async presentSubNodeCreation(projectTitle: string) {
    const modal = await this.modalController.create({
      component: SubNodeCreationComponent,
      componentProps: {
        projectTitle: projectTitle
      }
    });
    return await modal.present();
  }

  

  
  
}
