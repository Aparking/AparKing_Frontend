import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';

register();

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  component = GarageListComponent;
  constructor() {}
}
