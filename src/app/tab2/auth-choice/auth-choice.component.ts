import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-choice',
  templateUrl: './auth-choice.component.html',
  styleUrls: ['./auth-choice.component.scss'],
})
export class AuthChoiceComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
