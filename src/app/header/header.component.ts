import { Component, OnInit } from '@angular/core';
import { LoginService } from '../user/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../assets/scss/mediaquery.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  getUsername(): string | null {
    return this.loginService.getCurrentUserUsername();
  }

  onLogout() {
    this.loginService.logout();
  }
}
