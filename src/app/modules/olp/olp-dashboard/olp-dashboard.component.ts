import { Component } from '@angular/core';

@Component({
  selector: 'app-olp-dashboard',
  templateUrl: './olp-dashboard.component.html',
  styleUrl: './olp-dashboard.component.css',
  standalone: false
})
export class OlpDashboardComponent {
  totalTarget = 10000;

  campaigns = [
    { label: 'New Subscriptions', value: 152, target: 300, color: 'new' },
    { label: 'Renewal Contracts', value: 63, target: 500, color: 'renewal' },
    { label: 'Upsell Revenue', value: 23, target: 1000, color: 'upsell' },
    { label: 'Add-On Sales', value: 42, target: 2000, color: 'addon' },
  ];

  get totalPercentage(): number {
    return parseFloat(((this.totalAchieved / this.totalTarget) * 100).toFixed(1));
  }

  get totalAchieved(): number {
    return this.campaigns.reduce((sum, c) => sum + c.value, 0);
  }

  getWidth(value: number): string {
    return this.totalAchieved === 0 ? '0%' : `${(value / this.totalAchieved) * 100}%`;
  }

}
