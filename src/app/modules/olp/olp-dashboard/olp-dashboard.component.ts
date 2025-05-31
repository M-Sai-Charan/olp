import { Component } from '@angular/core';

@Component({
  selector: 'app-olp-dashboard',
  templateUrl: './olp-dashboard.component.html',
  styleUrl: './olp-dashboard.component.css',
  standalone: false
})
export class OlpDashboardComponent {
  selectedPeriod: string = 'Daily';
  timeFilter:any;
  periods = ['Daily', 'Weekly', 'Monthly'].map(p => ({ label: p, value: p }));

  chartData = {
    labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, '0')),
    datasets: [
      {
        label: 'Orders',
        backgroundColor: '#42A5F5',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 12) + 2),
      },
    ],
  };

  chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  pieData = {
    labels: ['Watches', 'Clothing', 'Gadgets', 'Accessories'],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA'],
      },
    ],
  };

  lineData = {
    labels: ['May 1', 'May 3', 'May 5', 'May 7'],
    datasets: [
      {
        label: 'New Clients',
        data: [10, 15, 25, 40],
        borderColor: '#42A5F5',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  waitingOrders = [
    { name: 'Order #85421', status: 'New' },
    { name: 'Order #85422', status: 'Processing' },
  ];

  ads = [
    { name: 'Black Watch Ad', roi: 10, ctr: 6 },
    { name: 'Green Earbuds Ad', roi: 15, ctr: 6 },
    { name: 'Yoga Set Ad', roi: 10, ctr: 6 },
  ];
  ordersChartData = {
  labels: Array.from({ length: 30 }, (_, i) => `${(i + 1).toString().padStart(2, '0')}`),
  datasets: [
    {
      label: 'Orders',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15)),
      backgroundColor: '#42A5F5'
    }
  ]
};

ordersChartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

categoryChartData = {
  labels: ['Watches', 'Clothing', 'Gadgets', 'Accessories'],
  datasets: [{
    data: [120, 90, 70, 40],
    backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA']
  }]
};

clientsChartData = {
  labels: ['May 1', 'May 3', 'May 5', 'May 7'],
  datasets: [{
    label: 'Clients',
    data: [10, 15, 25, 40],
    fill: false,
    borderColor: '#42A5F5',
    tension: 0.4
  }]
};



}
