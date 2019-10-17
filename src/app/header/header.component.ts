import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(private userService: UserService) {}

  public getUsername(): string | null {
    return this.userService.getCurrentUserUsername();
  }

  public onLogout(): void {
    this.userService.logout();
  }
}
