import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-info-group',
  templateUrl: './card-info-group.component.html',
  styleUrls: ['./card-info-group.component.scss']
})
export class CardInfoGroupComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor() {}

  ngOnInit() {}
}
