import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-project-name-modal',
  templateUrl: './project-name-modal.component.html',
  styleUrls: ['./project-name-modal.component.scss'],
})
export class ProjectNameModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      projectName: ['', Validators.required],
    });
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }
}
