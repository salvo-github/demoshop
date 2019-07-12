import { Component, OnInit } from '@angular/core';
import { LoginService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../assets/scss/mediaquery.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private userService: LoginService, private router: Router) {}

  ngOnInit() {}

  getUsername(): string | null {
    return this.userService.getCurrentUserUsername();
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
