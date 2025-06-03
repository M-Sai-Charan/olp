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
  rejectComment: string = '';
  showRejectDialog = false;

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

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

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
      this.messageService.add({ severity: 'success', summary: 'Quote Generated', detail: 'Moved to in-progress.' });
      this.generatePDF(this.selectedCustomer);
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
    this.messageService.add({ severity: 'success', summary: 'Approved', detail: 'Budget approved.' });
  }

  reject(customer: any) {
    this.rejectComment = '';
    this.showRejectDialog = true;
  }

  confirmReject() {
    if (this.selectedCustomer) {
      this.selectedCustomer.status = 'rejected';
      this.selectedCustomer.rejectComment = this.rejectComment;
      this.showRejectDialog = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Rejected',
        detail: `Budget rejected. Comment: ${this.rejectComment || 'No comment'}`
      });
      this.selectedCustomer = null;
    }
  }

  undoReject(customer: any) {
    customer.status = 'in-progress';
    this.messageService.add({ severity: 'info', summary: 'Undo', detail: 'Rejection undone. Back to in-progress.' });
  }

  viewQuote(customer: any) {
    this.selectedCustomer = customer;
    this.formDisabled = true;
    this.calculateTotalBudget();
    this.generatePDF(customer);
  }

  isAllBudgetsEntered(): boolean {
    if (!this.selectedCustomer || !this.selectedCustomer.events) return false;
    return this.selectedCustomer.events.every((event: any) => event.budget && event.budget > 0);
  }

  generatePDF(customer: any) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Customer Budget Quote', 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${customer.name}`, 20, 30);
    doc.text(`Email: ${customer.email}`, 20, 37);
    doc.text(`Phone: ${customer.phone}`, 20, 44);

    doc.text('Events:', 20, 55);
    customer.events.forEach((event: any, i: number) => {
      doc.text(`• ${event.name}: ₹${event.budget}`, 25, 62 + i * 7);
    });

    doc.text(`Total: ₹${customer.events.reduce((sum: number, e: any) => sum + e.budget, 0)}`, 20, 70 + customer.events.length * 7);
    doc.save(`Quote_${customer.name.replace(/\s/g, '_')}.pdf`);
  }

}
