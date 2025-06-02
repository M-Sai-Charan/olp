import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-olp-admin',
  templateUrl: './olp-admin.component.html',
  styleUrl: './olp-admin.component.css',
  standalone: false
})
export class OlpAdminComponent implements OnInit {
  employeeForm!: FormGroup;

  employeeOptions: any[] = [
    { label: 'John Doe', value: '1' },
    { label: 'Jane Smith', value: '2' },
    { label: 'Arjun Kumar', value: '3' }
  ];

  teamOptions = [
    { label: 'Team A', value: 'A' },
    { label: 'Team B', value: 'B' },
    { label: 'Team C', value: 'C' }
  ];

  roleOptions = [
    { label: 'Cameraman', value: 'cameraman' },
    { label: 'Lightman', value: 'lightman' },
    { label: 'Editor', value: 'editor' }
  ];

  showAddDialog: boolean = false;
  newEmployeeName: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [null],
      team: [null, Validators.required],
      role: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required]
    });
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      console.log('Form Submitted', this.employeeForm.value);
      // Call service to save employee assignment here
    }
  }

  cancelAddEmployee() {
    this.newEmployeeName = '';
    this.showAddDialog = false;
  }

  confirmAddEmployee() {
    if (this.newEmployeeName.trim()) {
      const newId = (this.employeeOptions.length + 1).toString();
      this.employeeOptions.push({ label: this.newEmployeeName, value: newId });

      // Optionally select the new employee in the form
      this.employeeForm.patchValue({ employeeId: newId });

      this.newEmployeeName = '';
      this.showAddDialog = false;
    }
  }
}
