import { Component, OnInit } from '@angular/core';
import { Logout } from '../../../service/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private logout: Logout,private router: Router) { }

  ngOnInit() {
  }

  logoutUser(): void {
    this.logout.logout()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        error: (e) => console.error(e)
      });
  }

}
