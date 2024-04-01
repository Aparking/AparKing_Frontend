import { Component, OnInit } from '@angular/core';
import { Logout } from '../../../service/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private logout: Logout, private router: Router) { }

  ngOnInit() {
  }

  async logoutUser(): Promise<void> {
    try {
      const res = await this.logout.logout();
      console.log(res);
      this.router.navigate(['/login']);
    } catch (e) {
      console.error(e);
    }
  }

}
