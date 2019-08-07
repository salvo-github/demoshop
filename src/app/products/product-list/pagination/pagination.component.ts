import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PaginationProperties } from './pagination-properties.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() paginationActions: { [s: string]: boolean };
  @Output() changePage = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onClick(action: string): void {
    this.changePage.emit(action);
  }
}
