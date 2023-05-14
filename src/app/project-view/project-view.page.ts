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
  subNodes: any[] = [];

  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2; // center of the parent node
  radius = 300; // distance from the parent to a subnode



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

    modal.onDidDismiss().then((data) => {
      // Check if data is provided, and if so, add the subnode to the subNodes array
      if (data.data) {
        this.subNodes.push(data.data);
      }
    });

    return await modal.present();
  }

  getX2(i: number): number {
    const angle = 2 * Math.PI * i / this.subNodes.length; // Remove the angle adjustment
    return this.centerX + this.radius * Math.cos(angle);
  }
  
  getY2(i: number): number {
    const angle = 2 * Math.PI * i / this.subNodes.length; // Remove the angle adjustment
    return this.centerY + this.radius * Math.sin(angle);
  }
  
  
  getLineStartX(i: number): number {
    const angle = 2 * Math.PI * i / this.subNodes.length;
    return this.centerX + 100 * Math.cos(angle);
  }
  
  getLineStartY(i: number): number {
    const angle = 2 * Math.PI * i / this.subNodes.length;
    return this.centerY + 100 * Math.sin(angle);
  }
  
  getLineEndX(i: number): number {
    const angle = 2 * Math.PI * i / this.subNodes.length;
    return this.getX2(i) + 50 * Math.cos(angle);
  }
  
  getLineEndY(i: number): number {
    const angle = 2 * Math.PI * i / this.subNodes.length;
    return this.getY2(i) + 50 * Math.sin(angle);
  }
  
  
  
  
  
  
  

  

  
  
}
