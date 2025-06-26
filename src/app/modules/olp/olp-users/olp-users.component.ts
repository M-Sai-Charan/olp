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
    this.olpService.getAllOLPEnquires('GetMasterData').subscribe((data: any) => {
      if (data) {
        let olpUsers = this.getOLPData(data)?.EnquiryDetails
        olpUsers = olpUsers.filter((i: any) => i.Status === 'New')
        this.olpUsers = olpUsers
        this.olpEventsLists = data?.EventMaster
      }
    })
  }
  getOLPData(data: any) {
    data.EnquiryDetails.forEach((element: any) => {
      const matchingEvents = data.EventDetails.filter((event: any) => {
        return event.EnquiryID === element.EnquiryID
      })
      element.events = matchingEvents
    });
    return data
  }
  getOLPMaster() {
    this.olpEventsTimes = [
      { id: 1, name: "Early Morning", value: "morning" },
      { id: 2, name: "Afternoon", value: "afternoon" },
      { id: 3, name: "Evening", value: "evening" },
      { id: 4, name: "Night", value: "night" }
    ]
    // this.olpService.getOLPMaster('OlpMaster/getOlpMaster').subscribe((data: any) => {
    //   this.olpStatusLists = [data.statuses[0], data.statuses[1], data.statuses[4]];
    //   this.olpEventsLists = data.events;
    //   this.olpEventsTimes = data.eventTimes;
    //   this.olpEmployeesLists = data.employees;
    // })
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
      eventName: [event.EventName || null, Validators.required],
      eventDate: [event.Date ? new Date(event.Date) : null, Validators.required],
      eventLocation: [event.Location || '', Validators.required],
      eventTime: [event.Time || null, Validators.required],
      eventGuests: [event.Guests ?? null, [Validators.required, Validators.min(1)]]
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
      eventDate: this.formatDateToYMD(formEvent.eventDate),
      eventLocation: formEvent.eventLocation,
      eventTime: formEvent.eventTime || {},
      eventGuests: String(formEvent.eventGuests || '')
    }));

    const updatedUser = {
      ...this.selectedUser,
      // calledBy: this.eventForm.value.calledBy,
      // callDate: this.eventForm.value.callDate,
      // callStatus: this.eventForm.value.callStatus,
      events: updatedEvents
    };
    console.log(updatedUser)
    // this.olpService.updateOLPEnquiry(this.selectedUser.id, updatedUser).subscribe({
    //   next: () => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Updated',
    //       detail: 'User event updated  and moved to Invoice successfully.'
    //     });
    //     this.visible = false;
    //     this.getOLPEnquires();
    //     this.getOLPMaster();
    //   },
    //   error: () => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Failed',
    //       detail: 'Something went wrong while saving.'
    //     });
    //   }
    // });
  }
   formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
