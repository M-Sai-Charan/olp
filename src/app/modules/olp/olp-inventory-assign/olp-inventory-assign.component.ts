import { Component } from '@angular/core';
interface TeamMember {
  id: number;
  name: string;
  value: string; // role
  assignedInventory?: string[];
}
@Component({
  selector: 'app-olp-inventory-assign',
  templateUrl: './olp-inventory-assign.component.html',
  styleUrl: './olp-inventory-assign.component.css',
  standalone: false
})
export class OlpInventoryAssignComponent {
  bookings: any = [];
  inventories: string[] = ['Camera', 'Tripod', 'Lighting Kit', 'Drone', 'Gimbal'];

  ngOnInit(): void {
    this.bookings = [
      {
        id: 2,
        olpId: "002OLP2025",
        bride: "test",
        groom: "test",
        contactNumber: "8383848382",
        email: "test@gmail.com",
        status: "New",
        location: "fd",
        comments: "fd",
        source: "Instagram",
        createdOn: "2025-06-11T06:15:51.7593635Z",
        updatedOn: "2025-06-11T09:03:32.230655Z",
        callDate: "2025-06-11T07:50:42.386Z",
        teamStatus: "Closed",
        calledBy: { id: 4, name: "Sam", value: "sam" },
        callStatus: { name: "Closed", value: "Closed" },
        events: [
          {
            eventName: { id: 4, name: "Sangeeth", value: "sangeeth" },
            eventDate: "2025-06-28T18:30:00.000Z",
            eventLocation: "chennai",
            eventTime: { id: 3, name: "Evening", value: "evening" },
            eventGuests: "1000",
            eventBudget: "250000",
            eventTeams: [
              { id: 1, name: "Steve", value: "photographer" },
              { id: 6, name: "Pollard", value: "editor" },
              { id: 11, name: "Narine", value: "lightman" },
              { id: 16, name: "Daniel", value: "droneoperator" },
              { id: 20, name: "Alice", value: "videographer" }
            ]
          },
          {
            eventName: { id: 4, name: "Marriage", value: "marriage" },
            eventDate: "2025-06-28T18:30:00.000Z",
            eventLocation: "chennai",
            eventTime: { id: 3, name: "Evening", value: "evening" },
            eventGuests: "1000",
            eventBudget: "250000",
            eventTeams: [
              { id: 1, name: "Steve", value: "photographer" },
              { id: 6, name: "Pollard", value: "editor" },
              { id: 11, name: "Narine", value: "lightman" },
              { id: 16, name: "Daniel", value: "droneoperator" },
              { id: 20, name: "Alice", value: "videographer" }
            ]
          }
        ],
        showEvents: false
      },
      {
        id: 3,
        olpId: "003OLP2025",
        bride: "test",
        groom: "test",
        contactNumber: "8383848382",
        email: "test@gmail.com",
        status: "New",
        location: "fd",
        comments: "fd",
        source: "Instagram",
        createdOn: "2025-06-11T06:15:51.7593635Z",
        updatedOn: "2025-06-11T09:03:32.230655Z",
        callDate: "2025-06-11T07:50:42.386Z",
        teamStatus: "Closed",
        calledBy: { id: 4, name: "Sam", value: "sam" },
        callStatus: { name: "Closed", value: "Closed" },
        events: [
          {
            eventName: { id: 4, name: "Sangeeth", value: "sangeeth" },
            eventDate: "2025-06-28T18:30:00.000Z",
            eventLocation: "chennai",
            eventTime: { id: 3, name: "Evening", value: "evening" },
            eventGuests: "1000",
            eventBudget: "250000",
            eventTeams: [
              { id: 1, name: "Steve", value: "photographer" },
              { id: 6, name: "Pollard", value: "editor" },
              { id: 11, name: "Narine", value: "lightman" },
              { id: 16, name: "Daniel", value: "droneoperator" },
              { id: 20, name: "Alice", value: "videographer" }
            ]
          }
        ],
        showEvents: false
      }
    ];
    this.bookings.forEach((booking: any) => {
      booking.showEvents = false;
      booking.events.forEach((event: any) => {
        event.showDetails = false;
      });
    });

  }

  toggleEvents(booking: any) {
    booking.showEvents = !booking.showEvents;
  }

  assignInventory(member: TeamMember, inventory: string) {
    if (!member.assignedInventory) {
      member.assignedInventory = [];
    }
    if (!member.assignedInventory.includes(inventory)) {
      member.assignedInventory.push(inventory);
    }
    console.log(`${member.name} assigned inventory:`, member.assignedInventory);
  }

  submitAll() {
    console.log('Updated Bookings:', JSON.stringify(this.bookings, null, 2));
  }
}
