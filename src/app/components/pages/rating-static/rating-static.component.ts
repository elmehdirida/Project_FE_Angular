import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rating-static',
  templateUrl: './rating-static.component.html',
  styleUrls: ['./rating-static.component.css']
})
export class RatingStaticComponent {
  @Input() maxRating=5;
  maxRatingArr:any = [];
  @Input() SelectedStart=0;
  @Output()
  onRating: EventEmitter<number> =new EventEmitter<number>();
  constructor() {
    console.log("s",this.SelectedStart)
  }
  ngOnInit(): void {
    this.maxRatingArr=Array(this.maxRating).fill(0)
  }


}
