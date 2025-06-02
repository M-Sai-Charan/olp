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
  teams = [{ name: 'Team A', value: 'A' }, { name: 'Team B', value: 'B' }];
  roles = [
    { name: 'Cameraman', value: 'cameraman' },
    { name: 'Lightman', value: 'lightman' },
    { name: 'Editor', value: 'editor' }
  ];

  showDialog = false;
  newEmployeeName = '';

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      employee: ['', Validators.required],
      team: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
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
 isInvalid(field: string): boolean {
    const control = this.adminForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  confirmAddEmployee() {
    this.employees.push({ name: this.newEmployeeName });
    this.adminForm.patchValue({ employee: this.newEmployeeName });
    this.showDialog = false;
  }

  submitForm() {
    if (this.adminForm.valid) {
      console.log('Submitted Data:', this.adminForm.value);
    }
  }
  onReset(){}
}
