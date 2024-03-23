import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { MemberType } from '../../models/pricing.models';
import { PricingPlanService } from '../../service/pricing-plan.service';

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
    this.currentUser = this.authService.getCurrentUser();
  }

  async selectPlan(planType: MemberType) {
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

    let startDate: Date = new Date();
    let endDate: Date = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const plan = {
      start_date: startDate,
      end_date: endDate,
      type: planType,
      user: this.currentUser,
      price: price,
    };

    try {
      const res = await this.pricingPlanService.pricingUser(plan);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }
}
