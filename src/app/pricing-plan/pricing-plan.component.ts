import { Component, OnInit } from '@angular/core';
import { LoginService } from '../usuarios/login/login.service';
import { MemberType } from './models/pricing.models';
import { PricingPlanService } from './pricing-plan.service';
@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.scss'],
})
export class PricingPlanComponent implements OnInit {
  currentUser: any;
  MemberType: typeof MemberType;

  constructor(private authService: LoginService, private pricingPlanService: PricingPlanService) {
    this.MemberType = MemberType;
   }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser(); // Asegúrate de tener un método para obtener el usuario actual
  }

  selectPlan(planType: MemberType) {
    let price: number;

  switch (planType) {
    case MemberType.FREE:
      price = 0.00;
      break;
    case MemberType.NOBLE:
      price = 20.99;
      break;
    case MemberType.KING:
      price = 30.99;
      break;
    default:
      throw new Error(`Unsupported plan type: ${planType}`);
  }

  const plan = {
    user: this.currentUser,
    type: planType,
    price: price
  };
  console.log(plan.user);
  this.pricingPlanService.pricingUser(plan)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  }


