import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-figure',
  templateUrl: './card-figure.component.html',
  styleUrls: ['./card-figure.component.scss']
})
export class CardFigureComponent implements OnInit {
  @Input() public imageSrc: string;
  @Input() public rating: number;
  @Input() public maxRating: number;

  constructor() {}

  ngOnInit() {}
}
