import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  statusOptions = [
    { label: 'All', value: null },
    { label: 'New', value: 'New' },
    { label: 'In-progress', value: 'In-progress' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Closed', value: 'Closed' },
    { label: 'Blocked', value: 'Blocked' }
  ];

  olpEventsLists = [
    { id: 1, name: "Haldi", value: "haldi" },
    { id: 2, name: "Nalugu", value: "Nalugu" },
    { id: 3, name: "Mehandi", value: "mehandi" },
    { id: 4, name: "Sangeeth", value: "sangeeth" },
    { id: 5, name: "Reception", value: "reception" },
    { id: 6, name: "Wedding", value: "wedding" }
  ];

  olpEmployeesLists = [
    { id: 1, name: "John", value: "john" },
    { id: 2, name: "Bose", value: "bose" },
    { id: 3, name: "Stella", value: "stella" },
    { id: 4, name: "Sam", value: "sam" }
  ];

  olpEventsTimes = [
    { id: 1, name: "Early Morning", value: "morning" },
    { id: 2, name: "Afternoon", value: "afternoon" },
    { id: 3, name: "Evening", value: "evening" },
    { id: 4, name: "Night", value: "night" }
  ];
  olpCallStatus = [
    { id: 1, name: "Not Interested", value: "notinterested" },
    { id: 2, name: "Follow Up", value: "followup" },
    { id: 3, name: "Booked", value: "booked" }
  ];

  olpUsers = [
    {
      id: 1,
      olpId: "001OLP2025",
      bride: "John",
      groom: "Stella",
      contactNumber: 6301587956,
      email: "msunnylive@gmail.com",
      comments: "test",
      status: "New",
      createdOn: "27-05-2025 8:30AM",
      calledBy: { id: 1, name: "John", value: "john" },
      callDate: "Wed Jun 04 2025",
      callStatus: { id: 2, name: "Follow Up", value: "followup" },
      events: [
        {
          eventName: { id: 6, name: "Wedding", value: "wedding" },
          eventDate: "Wed Jun 04 2025",
          eventLocation: "banglore",
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 200000
        },
        {
          eventName: { id: 5, name: "Reception", value: "reception" },
          eventDate: "Wed Jun 01 2025",
          eventLocation: "chennai",
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 100000
        }
      ]
    },
    {
      id: 2,
      olpId: "002OLP2025",
      bride: "John",
      groom: "Stella",
      contactNumber: 6301587956,
      email: "msunnylive@gmail.com",
      comments: "test",
      status: "In-progress",
      createdOn: "27-05-2025 8:30AM",
      calledBy: { id: 1, name: "John", value: "john" },
      callDate: "Wed Jun 04 2025",
      callStatus: { id: 2, name: "Follow Up", value: "followup" },
      events: [
        {
          eventName: { id: 6, name: "Wedding", value: "wedding" },
          eventDate: "Wed Jun 04 2025",
          eventLocation: "banglore",
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 200000
        },
        {
          eventName: { id: 5, name: "Reception", value: "reception" },
          eventDate: "Wed Jun 01 2025",
          eventLocation: "chennai",
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 100000
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }
  ngOnInit(): void {
    this.filteredUsers = [...this.olpUsers];
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
    this.olpuserId = user.id;
    this.selectedUser = user;
    this.previousUserData = JSON.parse(JSON.stringify(user)); // Deep clone for undo
    this.initEventForm(user.events);
  }

  initEventForm(events: any[]) {
    this.eventForm = this.fb.group({
      calledBy: [this.selectedUser.calledBy || null],
      callDate: [this.selectedUser.callDate ? new Date(this.selectedUser.callDate) : new Date()],
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
      this.messageService.add({ severity: 'error', summary: 'Validation Failed', detail: 'Please fill all required fields' });
      return;
    }
    this.selectedUser.calledBy = this.eventForm.value.calledBy;
    this.selectedUser.callDate = this.eventForm.value.callDate;
    this.selectedUser.events = this.eventForm.value.events;
    this.visible = false;
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Event details updated successfully.' });
  }
  undoChanges() {
    if (this.previousUserData) {
      const idx = this.olpUsers.findIndex(u => u.id === this.previousUserData.id);
      if (idx !== -1) {
        this.olpUsers[idx] = JSON.parse(JSON.stringify(this.previousUserData));
        this.filteredUsers = [...this.olpUsers];
        this.messageService.add({ severity: 'warn', summary: 'Undone', detail: 'Changes reverted.' });
        this.visible = false;
      }
    }
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
