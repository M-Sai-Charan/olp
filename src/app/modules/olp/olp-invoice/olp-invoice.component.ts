import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OlpService } from '../olp.service';

@Component({
  selector: 'app-olp-invoice',
  templateUrl: './olp-invoice.component.html',
  styleUrls: ['./olp-invoice.component.css'],
  providers: [MessageService],
  standalone: false,
})
export class OlpInvoiceComponent implements OnInit {
  invoiceData: any[] = [];
  groupedData: { [key: string]: any[] } = {};
  budgetStatuses = ['New', 'In-progress', 'Closed', 'Pending'];
  selectedOlp: any = null;
  selectedForm: FormGroup | null = null;
  dialogVisible = false;
  activeTabIndex = 0;
  olpStatusLists: any = []
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private olpService: OlpService
  ) { }

  ngOnInit(): void {
    this.loadDummyData();
    this.getOLPMaster();
  }

  loadDummyData() {
    this.olpService.getAllOLPEnquires('WeddingEvents').subscribe((data: any) => {
      this.invoiceData = data || [];
      this.groupedData = {};
      for (const status of this.budgetStatuses) {
        this.groupedData[status] = this.invoiceData.filter(i => i.callStatus.name === status);
      }
    });
  }
  getOLPMaster() {
    this.olpService.getOLPMaster('OlpMaster/getOlpMaster').subscribe((data: any) => {
      this.olpStatusLists = data.statuses;
    })
  }
  openOlpDialog(olp: any) {
    this.selectedOlp = olp;
    this.selectedForm = this.fb.group({
      olpId: [{ value: olp.olpId, disabled: true }],
      callStatus: [{ value: olp.callStatus || '', disabled: olp.callStatus?.name !== 'In-progress' }],
      events: this.fb.array(
        olp.events.map((event: any) =>
          this.fb.group({
            eventName: [event.eventName.name],
            eventDate: [{ value: new Date(event.eventDate), disabled: true }],
            eventLocation: [{ value: event.eventLocation, disabled: true }],
            eventTime: [{ value: event.eventTime.name, disabled: true }],
            eventGuests: [{ value: event.eventGuests, disabled: true }],
            eventBudget: [
              { value: event.eventBudget || '', disabled: olp.callStatus?.name !== 'In-progress' },
              olp.callStatus?.name === 'In-progress' ? [Validators.required, Validators.min(1)] : []
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
    if (this.selectedForm?.valid && this.selectedOlp) {
      const rawData = this.selectedForm.getRawValue();

      const updatedOlp = { ...this.selectedOlp };
      updatedOlp.callStatus = rawData.callStatus;
      updatedOlp.events = updatedOlp.events.map((event: any, index: number) => ({
        ...event,
        eventBudget: `${rawData.events[index].eventBudget}`
      }));

      this.olpService.updateOLPEnquiry(updatedOlp.id, updatedOlp).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Budget saved successfully.'
          });
          this.dialogVisible = false;
          this.loadDummyData();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Something went wrong while saving.'
          });
        }
      });
    } else {
      this.selectedForm?.markAllAsTouched();
    }

  }

  getSeverity(status: string): string {
    switch (status) {
      case 'New': return 'info';
      case 'In-progress': return 'warning';
      case 'Completed': return 'success';
      case 'Rejected': return 'danger';
      default: return 'info';
    }
  }
}
