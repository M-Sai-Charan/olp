import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-olp-team-assign',
  templateUrl: './olp-team-assign.component.html',
  styleUrls: ['./olp-team-assign.component.css'],
  providers: [MessageService],
  standalone: false
})
export class OlpTeamAssignComponent {
  events = [
    {
      id: 1,
      olpId: '001OLP2025',
      bride: 'John',
      groom: 'Stella',
      contactNumber: 6301587956,
      email: 'msunnylive@gmail.com',
      status: 'New',
      createdOn: '27-05-2025 8:30AM',
      calledBy: { id: 1, name: 'John', value: 'john' },
      callDate: 'Wed Jun 04 2025',
      budgetStatus: 'Completed',
      budgetComments: 'Budget added',
      events: [
        {
          eventName: { id: 6, name: 'Wedding', value: 'wedding' },
          eventDate: 'Wed Jun 04 2025',
          eventLocation: 'Bangalore',
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 200000,
          eventTeams: [],
        },
        {
          eventName: { id: 5, name: 'Reception', value: 'reception' },
          eventDate: 'Wed Jun 01 2025',
          eventLocation: 'Chennai',
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 100000,
          eventTeams: [],
        },
      ],
    },
    {
      id: 2,
      olpId: '002OLP2025',
      bride: 'John',
      groom: 'Stella',
      contactNumber: 6301587956,
      email: 'msunnylive@gmail.com',
      status: 'New',
      createdOn: '27-05-2025 8:30AM',
      calledBy: { id: 1, name: 'John', value: 'john' },
      callDate: 'Wed Jun 04 2025',
      budgetStatus: 'Completed',
      budgetComments: 'Budget added',
      events: [
        {
          eventName: { id: 6, name: 'Wedding', value: 'wedding' },
          eventDate: 'Wed Jun 04 2025',
          eventLocation: 'Bangalore',
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 200000,
          eventTeams: [],
        },
        {
          eventName: { id: 5, name: 'Reception', value: 'reception' },
          eventDate: 'Wed Jun 01 2025',
          eventLocation: 'Chennai',
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 100000,
          eventTeams: [],
        },
      ],
    }
  ];

  olpTeamLists = [
    { id: 1, name: 'Alice', role: 'Photographer' },
    { id: 2, name: 'Bob', role: 'Videographer' },
    { id: 3, name: 'Charlie', role: 'Editor' },
    { id: 4, name: 'Diana', role: 'Photographer' },
    { id: 5, name: 'Eva', role: 'Editor' },
    { id: 6, name: 'Sam', role: 'Lightman' },
    { id: 7, name: 'Druh', role: 'Drone Operator' },
    { id: 8, name: 'Drak', role: 'Lightman' },
    { id: 9, name: 'Jiu', role: 'Videographer' },
  ];

  roles = ['Photographer', 'Videographer', 'Editor', 'Drone Operator'];
  expandedOlpRows = {};
  selectedOlp: any = null;
  selectedEvent: any = null;
  selectedAssignments: { [role: string]: any } = {};
  displayDialog: boolean = false;

  constructor(private messageService: MessageService) {
  }
  openAssignDialog(olp: any, event: any) {
    this.selectedOlp = olp;
    this.selectedEvent = event;
    this.selectedAssignments = {};

    for (const role of this.roles) {
      const assigned = event.eventTeams.find((m: any) => m.role === role);
      this.selectedAssignments[role] = assigned || null;
    }

    this.displayDialog = true;
  }

  getAvailableEmployees(role: string) {
    if (!this.selectedEvent) return [];

    return this.olpTeamLists.filter(
      (e: any) =>
        e.role === role &&
        !this.isAlreadyAssigned(e.id, role)
    );
  }

  isAlreadyAssigned(employeeId: number, roleToAssign: string): boolean {
    return this.selectedEvent.eventTeams.some(
      (m: any) => m.id === employeeId && m.role !== roleToAssign
    );
  }

  assignTeam() {
    const assigned: any[] = [];

    for (const role of this.roles) {
      const employee = this.selectedAssignments[role];
      if (employee) {
        if (assigned.some((e) => e.id === employee.id)) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Duplicate Assignment',
            detail: `${employee.name} is already selected for another role.`,
          });
          return;
        }
        assigned.push(employee);
      }
    }

    this.selectedEvent.eventTeams = assigned;
    this.messageService.add({
      severity: 'success',
      summary: 'Team Assigned',
      detail: `Team assigned to ${this.selectedEvent.eventName.name}`,
    });

    // Optionally update OLP team status if all events have teams
    this.updateOlpTeamStatus(this.selectedOlp);

    this.displayDialog = false;
  }

  updateOlpTeamStatus(olp: any) {
    const allAssigned = olp.events.every((ev: any) => ev.eventTeams.length > 0);
    olp.team = allAssigned ? 'assigned' : 'pending';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'Photographer':
        return 'photographer';
      case 'Videographer':
        return 'videographer';
      case 'Editor':
        return 'editor';
      default:
        return '';
    }
  }
}
