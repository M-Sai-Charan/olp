import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-olp-invoice',
  templateUrl: './olp-invoice.component.html',
  styleUrls: ['./olp-invoice.component.css'],
  providers: [DialogService, MessageService],
  standalone: false
})
export class OlpInvoiceComponent implements OnInit {
  invoiceData: any[] = [];
  groupedData: { [key: string]: any[] } = {};
  budgetStatuses = ['New', 'In-progress', 'Completed', 'Rejected'];
  selectedOlp: any = null;
  selectedForm: FormGroup | null = null;
  dialogVisible = false;
  activeTabIndex: number = 0
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadDummyData();
    this.groupByBudgetStatus();
  }

  loadDummyData() {
    // Paste your real JSON here
    this.invoiceData = [
      {
        "id": 1,
        "olpId": "001OLP2025",
        "bride": "Sathwika",
        "groom": "Vedavyas",
        "contactNumber": "6301587956",
        "email": "vedasathwika@gmail.com",
        "status": "New",
        "location": "Madanapalli",
        "comments": "Nothing",
        "source": "Instagram",
        "createdOn": "2025-06-10T02:10:04.8732616Z",
        "updatedOn": "2025-06-10T02:10:04.8732765Z",
        "calledBy": {
          "id": 0,
          "name": "",
          "value": ""
        },
        "callDate": "",
        "callStatus": {
          "name": "",
          "value": ""
        },
        "events": [
          {
            "eventName": {
              "id": 1,
              "name": "Haldi",
              "value": "haldi"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 5,
              "name": "Reception",
              "value": "reception"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 6,
              "name": "Wedding",
              "value": "wedding"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          }
        ]
      },
      {
        "id": 2,
        "olpId": "002OLP2025",
        "bride": "Navya",
        "groom": "Sai",
        "contactNumber": "9441633625",
        "email": "sainavya@gmail.com",
        "status": "New",
        "location": "Dharmavaram",
        "comments": "just it",
        "source": "Instagram",
        "createdOn": "2025-06-10T02:14:23.2950432Z",
        "updatedOn": "2025-06-10T02:37:25.7180099Z",
        "calledBy": {
          "id": 3,
          "name": "Stella",
          "value": "stella"
        },
        "callDate": "2025-06-10T18:30:00.000Z",
        "callStatus": {
          "name": "In-progress",
          "value": "In-progress"
        },
        "events": [
          {
            "eventName": {
              "id": 1,
              "name": "Haldi",
              "value": "haldi"
            },
            "eventDate": "2025-06-17T18:30:00.000Z",
            "eventLocation": "banglore 1",
            "eventTime": {
              "id": 1,
              "name": "Early Morning",
              "value": "morning"
            },
            "eventGuests": "200",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 6,
              "name": "Wedding",
              "value": "wedding"
            },
            "eventDate": "2025-06-23T18:30:00.000Z",
            "eventLocation": "banglore 2",
            "eventTime": {
              "id": 3,
              "name": "Evening",
              "value": "evening"
            },
            "eventGuests": "500",
            "eventBudget": ""
          }
        ]
      },
      {
        "id": 3,
        "olpId": "003OLP2025",
        "bride": "Kavitha",
        "groom": "Rajesh",
        "contactNumber": "9440144635",
        "email": "rajeshkavitha@gmail.com",
        "status": "New",
        "location": "Bagepalli",
        "comments": "ntg",
        "source": "Others",
        "createdOn": "2025-06-10T02:15:11.6478803Z",
        "updatedOn": "2025-06-10T08:21:50.800386Z",
        "calledBy": {
          "id": 4,
          "name": "Sam",
          "value": "sam"
        },
        "callDate": "2025-06-10T08:15:10.391Z",
        "callStatus": {
          "name": "In-progress",
          "value": "In-progress"
        },
        "events": [
          {
            "eventName": {
              "id": 2,
              "name": "Nalugu",
              "value": "nalugu"
            },
            "eventDate": "2025-06-22T18:30:00.000Z",
            "eventLocation": "chennai",
            "eventTime": {
              "id": 4,
              "name": "Night",
              "value": "night"
            },
            "eventGuests": "2000",
            "eventBudget": ""
          }
        ]
      },
      {
        "id": 4,
        "olpId": "004OLP2025",
        "bride": "Saritha",
        "groom": "Ropesh",
        "contactNumber": "9848525501",
        "email": "ropeshsaritha@gmail.com",
        "status": "New",
        "location": "Bagepalli",
        "comments": "marriage",
        "source": "Instagram",
        "createdOn": "2025-06-10T02:16:00.6849821Z",
        "updatedOn": "2025-06-10T02:16:00.6849823Z",
        "calledBy": {
          "id": 0,
          "name": "",
          "value": ""
        },
        "callDate": "",
        "callStatus": {
          "name": "",
          "value": ""
        },
        "events": [
          {
            "eventName": {
              "id": 4,
              "name": "Sangeeth",
              "value": "sangeeth"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 6,
              "name": "Wedding",
              "value": "wedding"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          }
        ]
      },
      {
        "id": 5,
        "olpId": "005OLP2025",
        "bride": "Kavya",
        "groom": "Harsha",
        "contactNumber": "9293943389",
        "email": "harshakavya@gmail.com",
        "status": "New",
        "location": "Kodada",
        "comments": "sangeeeth",
        "source": "Facebook",
        "createdOn": "2025-06-10T02:16:52.765725Z",
        "updatedOn": "2025-06-10T02:16:52.7657251Z",
        "calledBy": {
          "id": 0,
          "name": "",
          "value": ""
        },
        "callDate": "",
        "callStatus": {
          "name": "",
          "value": ""
        },
        "events": [
          {
            "eventName": {
              "id": 2,
              "name": "Nalugu",
              "value": "nalugu"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 4,
              "name": "Sangeeth",
              "value": "sangeeth"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 6,
              "name": "Wedding",
              "value": "wedding"
            },
            "eventDate": "",
            "eventLocation": "",
            "eventTime": {
              "id": 0,
              "name": "",
              "value": ""
            },
            "eventGuests": "",
            "eventBudget": ""
          }
        ]
      },
      {
        "id": 6,
        "olpId": "006OLP2025",
        "bride": "Keerte",
        "groom": "Hari",
        "contactNumber": "9440649314",
        "email": "harikeerte@gmail.com",
        "status": "New",
        "location": "Madanapalle ",
        "comments": "Nothing ",
        "source": "Instagram",
        "createdOn": "2025-06-10T02:44:49.2352446Z",
        "updatedOn": "2025-06-10T08:22:57.2689388Z",
        "calledBy": {
          "id": 1,
          "name": "John",
          "value": "john"
        },
        "callDate": "2025-06-10T08:22:02.074Z",
        "callStatus": {
          "name": "In-progress",
          "value": "In-progress"
        },
        "events": [
          {
            "eventName": {
              "id": 1,
              "name": "Haldi",
              "value": "haldi"
            },
            "eventDate": "2025-06-24T18:30:00.000Z",
            "eventLocation": "mpl 1",
            "eventTime": {
              "id": 1,
              "name": "Early Morning",
              "value": "morning"
            },
            "eventGuests": "200",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 4,
              "name": "Sangeeth",
              "value": "sangeeth"
            },
            "eventDate": "2025-06-27T18:30:00.000Z",
            "eventLocation": "mpl 2",
            "eventTime": {
              "id": 3,
              "name": "Evening",
              "value": "evening"
            },
            "eventGuests": "500",
            "eventBudget": ""
          },
          {
            "eventName": {
              "id": 5,
              "name": "Reception",
              "value": "reception"
            },
            "eventDate": "2025-06-28T18:30:00.000Z",
            "eventLocation": "mpl 3",
            "eventTime": {
              "id": 3,
              "name": "Evening",
              "value": "evening"
            },
            "eventGuests": "1000",
            "eventBudget": ""
          }
        ]
      }
    ];
  }

  groupByBudgetStatus() {
    this.groupedData = {};
    for (const status of this.budgetStatuses) {
      this.groupedData[status] = this.invoiceData.filter(i => i.callStatus.name === status);
      console.log(this.groupedData[status])
    }
  }

  openOlpDialog(olp: any) {
    this.selectedOlp = olp;
    this.selectedForm = this.fb.group({
      olpId: [olp.olpId],
      budgetComments: [olp.budgetComments || ''],
      events: this.fb.array(
        olp.events.map((event: any) =>
          this.fb.group({
            eventName: [event.eventName.name],
            eventDate: [event.eventDate],
            eventLocation: [event.eventLocation],
            eventTime: [event.eventTime.name],
            eventGuests: [event.eventGuests],
            eventBudget: [
              { value: event.eventBudget || '', disabled: olp.budgetStatus !== 'In-progress' },
              olp.budgetStatus === 'In-progress' ? [Validators.required, Validators.min(1)] : []
            ]
          })
        )
      )
    });
    this.dialogVisible = true;
  }

  get eventsFormArray(): FormArray {
    return this.selectedForm?.get('events') as FormArray;
  }

  saveBudget() {
    if (this.selectedForm?.valid) {
      console.log('Saved budget:', this.selectedForm.value);
      this.dialogVisible = false;
      this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Budget saved successfully' });
    } else {
      this.selectedForm?.markAllAsTouched();
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
