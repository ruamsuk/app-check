import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status: boolean): void {
    if (this.currentTutorial.id) {

      this.tutorialService.update(this.currentTutorial.id, { published: status })
        .then(() => {
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        })
        // @ts-ignore
        .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };

    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        // @ts-ignore
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTutorial.id) {

      this.tutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })// @ts-ignore
        .catch((err) => console.log(err));
    }
  }
}
