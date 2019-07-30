import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit {
  @Input() public actions: { [s: string]: () => any };

  public constructor() {}

  public ngOnInit() {}

  public getActionsKeys(): string[] {
    return Object.keys(this.actions);
  }

  public getActionsMaxIndex(): number {
    return Object.keys(this.actions).length - 1;
  }

  public execute($event: MouseEvent, action: string): void {
    $event.preventDefault();
    this.actions[action]();
  }
}
