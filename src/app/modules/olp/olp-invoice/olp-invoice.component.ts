import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-olp-invoice',
  templateUrl: './olp-invoice.component.html',
  styleUrl: './olp-invoice.component.css',
  standalone: false,
  providers:[MessageService]
})
export class OlpInvoiceComponent implements OnInit {
  invoiceData = [
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
      budgetStatus: 'New',
      budgetComments: '',
      events: [
        {
          eventName: { id: 6, name: 'Wedding', value: 'wedding' },
          eventDate: 'Wed Jun 04 2025',
          eventLocation: 'banglore',
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 0
        },
        {
          eventName: { id: 5, name: 'Reception', value: 'reception' },
          eventDate: 'Wed Jun 01 2025',
          eventLocation: 'chennai',
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 0,
        },
      ]
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
      budgetComments: 'Budget added waiting for customer confirmation',
      events: [
        {
          eventName: { id: 6, name: 'Wedding', value: 'wedding' },
          eventDate: 'Wed Jun 04 2025',
          eventLocation: 'banglore',
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 200000
        },
        {
          eventName: { id: 5, name: 'Reception', value: 'reception' },
          eventDate: 'Wed Jun 01 2025',
          eventLocation: 'chennai',
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 100000,
        },
      ]
    },
    {
      id: 3,
      olpId: '003OLP2025',
      bride: 'John',
      groom: 'Stella',
      contactNumber: 6301587956,
      email: 'msunnylive@gmail.com',
      status: 'New',
      createdOn: '27-05-2025 8:30AM',
      calledBy: { id: 1, name: 'John', value: 'john' },
      callDate: 'Wed Jun 04 2025',
      budgetStatus: 'Completed',
      budgetComments: 'Budget added and confirmed by customer to start project',
      events: [
        {
          eventName: { id: 6, name: 'Wedding', value: 'wedding' },
          eventDate: 'Wed Jun 04 2025',
          eventLocation: 'banglore',
          eventTime: { id: 2, name: 'Afternoon', value: 'afternoon' },
          eventGuests: 1000,
          eventBudget: 200000
        },
        {
          eventName: { id: 5, name: 'Reception', value: 'reception' },
          eventDate: 'Wed Jun 01 2025',
          eventLocation: 'chennai',
          eventTime: { id: 4, name: 'Night', value: 'night' },
          eventGuests: 500,
          eventBudget: 100000,
        },
      ]
    }
  ];

 groupedData: { [key: string]: any[] } = {};
  budgetStatuses: string[] = ['New', 'In-progress', 'Completed', 'Rejected'];
  budgetFormMap: { [key: string]: FormArray } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDummyData();
    this.groupByBudgetStatus();
    this.initializeForms();
  }

  loadDummyData() {
    this.invoiceData = this.invoiceData;
  }

  groupByBudgetStatus() {
    this.groupedData = {};
    for (const status of this.budgetStatuses) {
      this.groupedData[status] = this.invoiceData.filter((i:any) => i.budgetStatus === status);
    }
  }
getOlpFormGroup(status: string, index: number): FormGroup {
  return this.budgetFormMap[status].at(index) as FormGroup;
}
  initializeForms() {
    for (const status of this.budgetStatuses) {
      this.budgetFormMap[status] = this.fb.array(
        this.groupedData[status]?.map(olp => this.createOlpFormGroup(olp)) || []
      );
    }
  }

  createOlpFormGroup(olp: any): FormGroup {
    return this.fb.group({
      olpId: [olp.olpId],
      budgetComments: [olp.budgetComments || ''],
      events: this.fb.array(
        olp.events.map((event:any) => this.fb.group({
          eventName: [event.eventName],
          eventDate: [event.eventDate],
          eventLocation: [event.eventLocation],
          eventTime: [event.eventTime],
          eventGuests: [event.eventGuests],
          eventBudget: [event.eventBudget, [Validators.required, Validators.min(1)]]
        }))
      )
    });
  }

  getEvents(formGroup: FormGroup): FormArray {
    return formGroup.get('events') as FormArray;
  }

  saveBudget(status: string, index: number) {
    const formGroup = this.budgetFormMap[status].at(index) as FormGroup;
    if (formGroup.valid) {
      console.log('Saved Data:', formGroup.value);
      // handle save logic here
    } else {
      formGroup.markAllAsTouched();
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'New': return 'info';
      case 'In-progress': return 'warning';
      case 'Completed': return 'success';
      case 'Rejected': return 'danger';
      default: return 'info';
    }
  }
}