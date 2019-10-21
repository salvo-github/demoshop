import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentUserUsername$: Observable<string>;

  public constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.currentUserUsername$ = this.userService.getCurrentUserUsername();
  }

  public onLogout(): void {
    this.userService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
