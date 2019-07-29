import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(private userService: UserService) {}

  protected getUsername(): string | null {
    return this.userService.getCurrentUserUsername();
  }

  protected onLogout(): void {
    this.userService.logout();
  }
}
