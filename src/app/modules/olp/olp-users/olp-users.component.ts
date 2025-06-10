import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { OlpService } from '../olp.service';
@Component({
  selector: 'app-olp-users',
  templateUrl: './olp-users.component.html',
  styleUrls: ['./olp-users.component.css'],
  standalone: false,
  providers: [MessageService]
})
export class OlpUsersComponent implements OnInit {
  @ViewChild('dt2') dt2!: Table;

  visible: boolean = false;
  olpuserId: number | null = null;
  selectedStatus: any = null;
  selectedUser: any;
  previousUserData: any = null;
  eventForm!: FormGroup;
  showModal = false;
  isViewOnly = false;
  selectedEventTypes: any[] = [];
  filteredUsers: any[] = [];
  olpStatusLists: any = [];
  olpEventsLists: any = [];
  olpEmployeesLists: any = [];
  olpEventsTimes: any = [];
  olpUsers: any = []

  constructor(private fb: FormBuilder, private messageService: MessageService, private olpService: OlpService) { }
  ngOnInit(): void {
    this.filteredUsers = [...this.olpUsers];
    this.getOLPEnquires();
    this.getOLPMaster();
  }

  getOLPEnquires() {
    this.olpService.getAllOLPEnquires('WeddingEvents').subscribe((data: any) => {
      if (data) {
        data.forEach((item: { callStatus: any; }) => {
          if (item.callStatus?.name === '') {
            item.callStatus = { name: 'New', value: 'New' };
          }
        });
        this.olpUsers = data
      }
    })
  }
  getOLPMaster() {
    this.olpService.getOLPMaster('OlpMaster/getOlpMaster').subscribe((data: any) => {
      this.olpStatusLists = data.statuses;
      this.olpEventsLists = data.events;
      this.olpEventsTimes = data.eventTimes;
      this.olpEmployeesLists = data.employees;
    })
  }
  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.dt2) {
      this.dt2.filterGlobal(input.value, 'contains');
    }
  }

  filterByStatus() {
    if (this.selectedStatus?.value) {
      this.dt2.filter(this.selectedStatus.value, 'status', 'equals');
    } else {
      this.dt2.clear();
    }
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'New': return 'success';
      case 'In-progress': return 'warning';
      case 'Pending': return 'danger';
      case 'Closed': return 'info';
      case 'Blocked': return 'secondary';
      default: return '';
    }
  }

  selectOLP(user: any) {
    this.visible = true;
    this.olpuserId = user.olpId;
    this.selectedUser = user;
    this.previousUserData = JSON.parse(JSON.stringify(user)); // Deep clone for undo
    this.initEventForm(user.events);
    // Check for blocked status
    if (user.callStatus?.value === 'Blocked') {
      this.setFormDisabled(true);
    } else {
      this.setFormDisabled(false);
    }
  }
  setFormDisabled(disabled: boolean) {
    if (disabled) {
      this.eventForm.disable({ emitEvent: false });
      this.isViewOnly = true;
    } else {
      this.eventForm.enable({ emitEvent: false });
      this.isViewOnly = false;
    }
  }
  initEventForm(events: any[]) {
    this.eventForm = this.fb.group({
      calledBy: [this.selectedUser.calledBy || null],
      callDate: [this.selectedUser.callDate ? new Date(this.selectedUser.callDate) : new Date()],
      callStatus: [this.selectedUser.callStatus || null],
      events: this.fb.array(events.map(e => this.createEventGroup(e)))
    });
  }

  createEventGroup(event: any): FormGroup {
    return this.fb.group({
      eventName: [event.eventName || null, Validators.required],
      eventDate: [event.eventDate ? new Date(event.eventDate) : null, Validators.required],
      eventLocation: [event.eventLocation || '', Validators.required],
      eventTime: [event.eventTime || null, Validators.required],
      eventGuests: [event.eventGuests ?? null, [Validators.required, Validators.min(1)]]
    });
  }
  get eventsFormArray(): FormArray {
    return this.eventForm.get('events') as FormArray;
  }

  addEvent() {
    this.eventsFormArray.push(this.createEventGroup({
      eventName: null,
      eventDate: null,
      eventLocation: '',
      eventTime: null,
      eventGuests: null
    }));
  }

  removeEvent(index: number) {
    this.eventsFormArray.removeAt(index);
  }

  saveEvents() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Failed',
        detail: 'Please fill all required fields',
      });
      return;
    }

    const formEvents = this.eventForm.value.events;

    const updatedEvents = formEvents.map((formEvent: any) => ({
      eventName: formEvent.eventName || {},
      eventDate: formEvent.eventDate,
      eventLocation: formEvent.eventLocation,
      eventTime: formEvent.eventTime || {},
      eventGuests: String(formEvent.eventGuests || '')
    }));

    const updatedUser = {
      ...this.selectedUser,
      calledBy: this.eventForm.value.calledBy,
      callDate: this.eventForm.value.callDate,
      callStatus: this.eventForm.value.callStatus,
      events: updatedEvents
    };
    this.olpService.updateOLPEnquiry(this.selectedUser.id, updatedUser).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'User event updated successfully.'
        });
        this.visible = false;
        this.getOLPEnquires();
        this.getOLPMaster();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Something went wrong while saving.'
        });
      }
    });
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.text(`OLP Events - ${this.selectedUser.bride} & ${this.selectedUser.groom}`, 10, 10);
    const eventData = this.selectedUser.events.map((e: any, i: number) => [
      i + 1,
      e.eventName?.name || '',
      e.eventDate || '',
      e.eventLocation,
      e.eventTime?.name || '',
      e.eventGuests
    ]);
    autoTable(doc, {
      head: [['#', 'Event Name', 'Date', 'Location', 'Time', 'Guests']],
      body: eventData,
      startY: 20
    });
    doc.save(`${this.selectedUser.bride}_${this.selectedUser.groom}_Events.pdf`);
  }

  trackByIndex(index: number): number {
    return index;
  }

}
