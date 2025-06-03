import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Invoice {
  id: number;
  customerName: string;
  invoiceDate: Date;
  dueDate: Date;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

interface Quote {
  id: number;
  customerName: string;
  quoteDate: Date;
  amount: number;
  validTill: Date;
  status: 'Accepted' | 'Pending' | 'Rejected';
}

interface Payment {
  id: number;
  invoiceId: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
}

@Component({
  selector: 'app-olp-invoice',
  templateUrl: './olp-invoice.component.html',
  styleUrl: './olp-invoice.component.css',
  standalone:false
})
export class OlpInvoiceComponent implements OnInit{
  invoices: Invoice[] = [];
  quotes: Quote[] = [];
  payments: Payment[] = [];

  displayInvoiceDialog = false;
  displayQuoteDialog = false;
  displayPaymentDialog = false;

  invoiceForm: FormGroup;
  quoteForm: FormGroup;
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      id: [null],
      customerName: ['', Validators.required],
      invoiceDate: [null, Validators.required],
      dueDate: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      status: ['Unpaid', Validators.required]
    });

    this.quoteForm = this.fb.group({
      id: [null],
      customerName: ['', Validators.required],
      quoteDate: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      validTill: [null, Validators.required],
      status: ['Pending', Validators.required]
    });

    this.paymentForm = this.fb.group({
      id: [null],
      invoiceId: [null, Validators.required],
      paymentDate: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }
  // Invoice methods
  openNewInvoice() {
    this.invoiceForm.reset({ status: 'Unpaid' });
    this.displayInvoiceDialog = true;
  }

  editInvoice(invoice: Invoice) {
    this.invoiceForm.patchValue(invoice);
    this.displayInvoiceDialog = true;
  }

  saveInvoice() {
    if (this.invoiceForm.invalid) return;
    const invoice = this.invoiceForm.value as Invoice;
    if (invoice.id) {
      const index = this.invoices.findIndex(i => i.id === invoice.id);
      if (index !== -1) this.invoices[index] = invoice;
    } else {
      invoice.id = this.invoices.length + 1;
      this.invoices.push(invoice);
    }
    this.displayInvoiceDialog = false;
  }

  deleteInvoice(invoice: Invoice) {
    this.invoices = this.invoices.filter(i => i.id !== invoice.id);
  }

  // Quote methods
  openNewQuote() {
    this.quoteForm.reset({ status: 'Pending' });
    this.displayQuoteDialog = true;
  }

  editQuote(quote: Quote) {
    this.quoteForm.patchValue(quote);
    this.displayQuoteDialog = true;
  }

  saveQuote() {
    if (this.quoteForm.invalid) return;
    const quote = this.quoteForm.value as Quote;
    if (quote.id) {
      const index = this.quotes.findIndex(q => q.id === quote.id);
      if (index !== -1) this.quotes[index] = quote;
    } else {
      quote.id = this.quotes.length + 1;
      this.quotes.push(quote);
    }
    this.displayQuoteDialog = false;
  }

  deleteQuote(quote: Quote) {
    this.quotes = this.quotes.filter(q => q.id !== quote.id);
  }

  // Payment methods
  openNewPayment(invoiceId: number) {
    this.paymentForm.reset({ invoiceId });
    this.displayPaymentDialog = true;
  }

  editPayment(payment: Payment) {
    this.paymentForm.patchValue(payment);
    this.displayPaymentDialog = true;
  }

  savePayment() {
    if (this.paymentForm.invalid) return;
    const payment = this.paymentForm.value as Payment;
    if (payment.id) {
      const index = this.payments.findIndex(p => p.id === payment.id);
      if (index !== -1) this.payments[index] = payment;
    } else {
      payment.id = this.payments.length + 1;
      this.payments.push(payment);
    }
    this.displayPaymentDialog = false;
  }

  deletePayment(payment: Payment) {
    this.payments = this.payments.filter(p => p.id !== payment.id);
  }
}

