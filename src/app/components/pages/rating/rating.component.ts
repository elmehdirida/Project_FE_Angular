import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{
  @Input() maxRating=5;
  maxRatingArr:any = [];
  @Input() SelectedStart=0;
  @Output()
  onRating: EventEmitter<number> =new EventEmitter<number>();
  ratingProductByUser : number=0;
  previousSelection =0;
  constructor() {

  }
  ngOnInit(): void {
    this.maxRatingArr=Array(this.maxRating).fill(0)
  }
  HandleMouseEnter(index:number){
    this.SelectedStart=index+1;
  }
  HandleMouseLeave(){
    if(this.previousSelection !==0){
      this.SelectedStart=this.previousSelection;
    }
    else{
      this.SelectedStart=0;

    }
  }
  rating(index:number){
    this.SelectedStart=index+1;
    this.previousSelection=this.SelectedStart
    this.onRating.emit(this.SelectedStart);
  }

}
