import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{
  maxRatingArr:any = [];
  @Input() SelectedStart=0;
  @Output() onRating: EventEmitter<number> =new EventEmitter<number>();
  previousSelection =0;
  @Input() isStatic:boolean=false;
  constructor() {
      this.previousSelection=this.SelectedStart;
  }
  ngOnInit(): void {
    this.maxRatingArr=Array(5).fill(0)
  }
  HandleMouseEnter(index:number){
    this.SelectedStart=index+1;
  }

rating(index:number){
  if (!this.isStatic) {
    this.SelectedStart=index+1;
    this.previousSelection=this.SelectedStart
    this.onRating.emit(this.SelectedStart);
  }
}

  HandleMouseLeave() {
    if(this.previousSelection !==0){
      this.SelectedStart=this.previousSelection;
    }else{
      this.SelectedStart=0;
    }

  }
}
