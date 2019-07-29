import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-rating',
  templateUrl: './card-rating.component.html',
  styleUrls: ['./card-rating.component.scss']
})
export class CardRatingComponent implements OnInit {
  @Input() public rating: number;
  @Input() public maxRating: number;
  public maxRatingArray: number[];

  constructor() {}

  ngOnInit() {
    this.maxRatingArray = new Array(this.maxRating);
  }
}