import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectViewPageRoutingModule } from './project-view-routing.module';

import { ProjectViewPage } from './project-view.page';
import { SubNodeCreationComponent } from '../components/sub-node-creation/sub-node-creation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectViewPageRoutingModule
  ],
  declarations: [ProjectViewPage, SubNodeCreationComponent]
})
export class ProjectViewPageModule {}
