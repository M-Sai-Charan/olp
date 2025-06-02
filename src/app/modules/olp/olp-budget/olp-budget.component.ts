import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-olp-budget',
  templateUrl: './olp-budget.component.html',
  styleUrl: './olp-budget.component.css',
  standalone: false,
  providers: [MessageService]
})
export class OlpBudgetComponent implements OnInit {
  budgetForm!: FormGroup;
  totalBudget = 0;
  selectedCustomer: any = null;
  formDisabled = false;

  customers = [
    {
      id: 1,
      name: 'John Doe',
      phone: '9876543210',
      email: 'john@example.com',
      status: 'new',
      events: [
        { name: 'Wedding', budget: 0 },
        { name: 'Reception', budget: 0 }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      phone: '8765432109',
      email: 'priya@example.com',
      status: 'in-progress',
      events: [
        { name: 'Engagement', budget: 50000 },
        { name: 'Mehendi', budget: 20000 }
      ]
    },
    {
      id: 3,
      name: 'Amit Kumar',
      phone: '9988776655',
      email: 'amit@example.com',
      status: 'done',
      events: [
        { name: 'Birthday', budget: 30000 }
      ]
    },
    {
      id: 4,
      name: 'Sita Rao',
      phone: '9090909090',
      email: 'sita@example.com',
      status: 'rejected',
      events: [
        { name: 'Baby Shower', budget: 45000 }
      ]
    }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.budgetForm = this.fb.group({
      customer: [null, Validators.required]
    });
  }

  get formModeTitle() {
    if (!this.selectedCustomer) return '';
    switch (this.selectedCustomer.status) {
      case 'new': return 'Add Budget';
      case 'in-progress': return 'Review & Approve Budget';
      case 'done': return 'View Approved Budget';
      case 'rejected': return 'Rejected Budget (Undo Available)';
      default: return '';
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'new': return 'info';
      case 'in-progress': return 'warning';
      case 'done': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  }

  startBudgeting(customer: any) {
    this.selectedCustomer = customer;
    this.formDisabled = false;
    this.budgetForm.reset();
    this.calculateTotalBudget();
  }

  calculateTotalBudget() {
    if (this.selectedCustomer)
      this.totalBudget = this.selectedCustomer.events.reduce(
        (sum: number, e: any) => sum + (e.budget || 0), 0
      );
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      this.selectedCustomer.status = 'in-progress';
      this.messageService.add({ severity: 'success', summary: 'Quote Generated', detail: 'Status moved to in-progress.' });
    }
  }

  reviewCustomer(customer: any) {
    this.selectedCustomer = customer;
    this.formDisabled = true;
    this.calculateTotalBudget();
  }

  approve(customer: any) {
    customer.status = 'done';
    this.selectedCustomer = null;
    this.messageService.add({ severity: 'success', summary: 'Approved', detail: 'Budget approved successfully.' });
  }

  reject(customer: any) {
    customer.status = 'rejected';
    this.selectedCustomer = null;
    this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Budget rejected. You can undo.' });
  }

  undoReject(customer: any) {
    customer.status = 'in-progress';
    this.messageService.add({ severity: 'info', summary: 'Undo', detail: 'Rejection undone. Back to in-progress.' });
  }

  viewQuote(customer: any) {
    this.selectedCustomer = customer;
    this.formDisabled = true;
    this.calculateTotalBudget();
  }
}
