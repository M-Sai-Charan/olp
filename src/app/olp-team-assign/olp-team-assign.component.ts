import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-olp-team-assign',
  templateUrl: './olp-team-assign.component.html',
  styleUrl: './olp-team-assign.component.css',
  standalone:false,
  providers:[MessageService]
})
export class OlpTeamAssignComponent {
events = [
    {
      eventId: 1,
      customer: 'ABC Corp',
      name: 'Wedding Shoot',
      date: '2025-06-10',
      assignedTeam: [],
    },
    {
      eventId: 2,
      customer: 'XYZ Ltd',
      name: 'Product Launch',
      date: '2025-06-15',
      assignedTeam: [],
    },
  ];

  employees = [
    { id: 1, name: 'Alice', role: 'Photographer', available: true },
    { id: 2, name: 'Bob', role: 'Videographer', available: true },
    { id: 3, name: 'Charlie', role: 'Editor', available: false },
    { id: 4, name: 'Diana', role: 'Photographer', available: true },
    { id: 5, name: 'Eva', role: 'Editor', available: true },
  ];

  roles = ['Photographer', 'Videographer', 'Editor'];

  selectedEvent: any;
  selectedAssignments: { [role: string]: any } = {};
  displayDialog = false;

  constructor(private messageService: MessageService) {}

  openAssignDialog(event: any) {
    this.selectedEvent = event;
    this.selectedAssignments = {};
    this.displayDialog = true;
  }

 getAvailableEmployees(role: string) {
  if (!this.selectedEvent) return [];

  return this.employees.filter(
    (e) =>
      e.role === role &&
      e.available &&
      !this.isAlreadyAssigned(e.id)
  );
}


  isAlreadyAssigned(employeeId: number): boolean {
    return this.selectedEvent.assignedTeam.some((m: any) => m.id === employeeId);
  }

  assignTeam() {
    const assigned:any = [];

    for (const role of this.roles) {
      const employee = this.selectedAssignments[role];
      if (employee) {
        if (assigned.some((e:any) => e.id === employee.id)) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Duplicate Assignment',
            detail: `${employee.name} is already selected.`,
          });
          return;
        }
        assigned.push(employee);
      }
    }

    this.selectedEvent.assignedTeam = assigned;
    this.messageService.add({
      severity: 'success',
      summary: 'Team Assigned',
      detail: `Team assigned to ${this.selectedEvent.name}`,
    });
    this.displayDialog = false;
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
