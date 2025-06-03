import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-olp-admin',
  templateUrl: './olp-admin.component.html',
  styleUrl: './olp-admin.component.css',
  standalone: false
})
export class OlpAdminComponent implements OnInit {
  adminForm: FormGroup;
  employees = [{ name: 'John' }, { name: 'Jane' }];
  teams = [
    { name: 'Team A', value: 'A' },
    { name: 'Team B', value: 'B' },
  ];
  roles = [
    { name: 'Cameraman', value: 'cameraman' },
    { name: 'Lightman', value: 'lightman' },
    { name: 'Editor', value: 'editor' },
  ];

  showDialog = false;
  newEmployeeName = '';
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      employee: ['', Validators.required],
      team: ['', Validators.required],
      role: ['', Validators.required],
      joiningDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  ngOnInit(): void {

  }
  showAddDialog() {
    this.showDialog = true;
    this.newEmployeeName = '';
  }

  cancelAddEmployee() {
    this.showDialog = false;
  }

  confirmAddEmployee() {
    this.isSubmitted = true;
    if (this.newEmployeeName.trim()) {
      this.employees.push({ name: this.newEmployeeName.trim() });
      this.adminForm.patchValue({ employee: this.newEmployeeName.trim() });
      this.showDialog = false;
      this.isSubmitted = false;
    }
  }

  isInvalid(field: string): boolean {
    const control = this.adminForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched || this.isSubmitted));
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.adminForm.valid) {
      console.log('Submitted Data:', this.adminForm.value);
      alert('Employee data saved successfully!');
      this.adminForm.reset();
      this.isSubmitted = false;
    }
  }

  onReset() {
    this.adminForm.reset();
    this.isSubmitted = false;
  }
}
