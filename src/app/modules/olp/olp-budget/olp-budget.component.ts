import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-olp-budget',
  templateUrl: './olp-budget.component.html',
  styleUrl: './olp-budget.component.css',
  standalone: false
})
export class OlpBudgetComponent implements OnInit {

  budgetForm!: FormGroup;

  customers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Priya Sharma' },
    { id: 3, name: 'Amit Kumar' }
  ];

  events = [
    { name: 'Wedding', budget: 0 },
    { name: 'Reception', budget: 0 },
    { name: 'Engagement', budget: 0 }
  ];

  totalBudget: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.budgetForm = this.fb.group({
      customer: [null, Validators.required]
    });
    this.calculateTotalBudget();
  }

  calculateTotalBudget() {
    this.totalBudget = this.events.reduce(
      (sum, e) => sum + (e.budget || 0),
      0
    );
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const quote = {
        customer: this.budgetForm.value.customer,
        events: this.events,
        totalBudget: this.totalBudget
      };

      console.log('Generated Quote:', quote);
      this.generatePDF(quote);
    }
  }
  generatePDF(quote: any) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Customer Event Budget Quote', 14, 20);

    // Customer Info
    doc.setFontSize(12);
    doc.text(`Customer: ${quote.customer.name}`, 14, 30);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 38);

    // Event Table
    const rows = quote.events.map((e: any) => [
      e.name,
      `${e.budget?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    ]);

    autoTable(doc, {
      head: [['Event Name', 'Budget']],
      body: rows,
      startY: 45
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY || 60;
    doc.setFontSize(14);
    doc.text(
      `Total Budget: ${quote.totalBudget.toLocaleString('en-IN', {
        minimumFractionDigits: 2
      })}`,
      14,
      finalY + 10
    );

    // Save PDF
    doc.save(`Quote_${quote.customer.name}.pdf`);
  }
}
