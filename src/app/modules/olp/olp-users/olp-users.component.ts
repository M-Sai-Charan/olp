import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-olp-users',
  templateUrl: './olp-users.component.html',
  styleUrl: './olp-users.component.css',
  standalone: false
})
export class OlpUsersComponent {
  @ViewChild('dt2') dt2!: Table;
  visible: boolean = false;
  olpuserId: any;
  selectedOLPEvents: any[] = [];
  selectedStatus: any | null = null;
  OLPEvents: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  statusOptions: any[] = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Inactive', value: 'Inactive' }
  ];
  olpUsers = [
    {
      "id": 1,
      "bride": "John",
      "groom": "Stella",
      "contactNumber": 6301587956,
      "email": "msunnylive@gmail.com",
      "comments": "test",
      "status": "New",
      "createdOn": "27-05-2025 8:30AM",
      "events": [
        {
          "eventName": "Wedding",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Reception",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Night",
          "eventGuests": 200
        },
        {
          "eventName": "Haldi",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Engagement",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        }
      ]
    },
    {
      "id": 2,
      "bride": "John",
      "groom": "Stella",
      "contactNumber": 6301587956,
      "email": "msunnylive@gmail.com",
      "comments": "test",
      "status": "In-progress",
      "createdOn": "27-05-2025 8:30AM",
      "events": [
        {
          "eventName": "Wedding",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Reception",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Night",
          "eventGuests": 200
        },
        {
          "eventName": "Haldi",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Engagement",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        }
      ]
    },
    {
      "id": 3,
      "bride": "John",
      "groom": "Stella",
      "contactNumber": 6301587956,
      "email": "msunnylive@gmail.com",
      "comments": "test",
      "status": "Pending",
      "createdOn": "27-05-2025 8:30AM",
      "events": [
        {
          "eventName": "Wedding",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Reception",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Night",
          "eventGuests": 200
        },
        {
          "eventName": "Haldi",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Engagement",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        }
      ]
    },
    {
      "id": 4,
      "bride": "John",
      "groom": "Stella",
      "contactNumber": 6301587956,
      "email": "msunnylive@gmail.com",
      "comments": "test",
      "status": "Closed",
      "createdOn": "27-05-2025 8:30AM",
      "events": [
        {
          "eventName": "Wedding",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Reception",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Night",
          "eventGuests": 200
        },
        {
          "eventName": "Haldi",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Engagement",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        }
      ]
    },
    {
      "id": 5,
      "bride": "John",
      "groom": "Stella",
      "contactNumber": 6301587956,
      "email": "msunnylive@gmail.com",
      "comments": "test",
      "status": "Blocked",
      "createdOn": "27-05-2025 8:30AM",
      "events": [
        {
          "eventName": "Wedding",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Reception",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Night",
          "eventGuests": 200
        },
        {
          "eventName": "Haldi",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Engagement",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        }
      ]
    },
    {
      "id": 6,
      "bride": "John",
      "groom": "Stella",
      "contactNumber": 6301587956,
      "email": "msunnylive@gmail.com",
      "comments": "test",
      "status": "New",
      "createdOn": "27-05-2025 8:30AM",
      "events": [
        {
          "eventName": "Wedding",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Reception",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Night",
          "eventGuests": 200
        },
        {
          "eventName": "Haldi",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        },
        {
          "eventName": "Engagement",
          "eventDate": "01-06-2025",
          "eventLocation": "Banglore",
          "eventTime": "Early Morning",
          "eventGuests": 200
        }
      ]
    }
  ]
  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt2.filterGlobal(input.value, 'contains');
  }
  filterByStatus() {
    console.log(this.selectedStatus)
    this.dt2.filter(this.selectedStatus.value, 'status', 'equals');
  }
  getSeverity(status: string) {
    switch (status) {
      case 'New':
        return 'success';
      case 'In-progress':
        return 'warn';
      case 'Pending':
        return 'danger';
      case 'Closed':
        return 'info';
      case 'Blocked':
        return 'secondary';
    }
    return ''
  }
  selectOLP(data: any) {
    console.log(data)
    this.visible = true;
    this.olpuserId = data.id;
  }
}


