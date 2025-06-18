import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OlpService } from '../olp.service';

@Component({
  selector: 'app-olp-admin',
  templateUrl: './olp-admin.component.html',
  styleUrl: './olp-admin.component.css',
  standalone: false
})
export class OlpAdminComponent implements OnInit {
  adminForm: FormGroup;
  teams = [
    { name: 'Team A', value: 'A' },
    { name: 'Team B', value: 'B' },
  ];
  roles = [
    { name: 'Cameraman', value: 'cameraman' },
    { name: 'Lightman', value: 'lightman' },
    { name: 'Editor', value: 'editor' },
  ];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  statuses = ['Active', 'Inactive', 'On Leave'];
  genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];
  Routes = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Users', icon: 'pi pi-users', route: '/users' },
    { label: 'Invoice', icon: 'pi pi-receipt', route: '/invoice' },
    { label: 'Budget', icon: 'pi pi-wallet', route: '/budget' },
    { label: 'Team Assign', icon: 'pi pi-clipboard', route: '/team-assign' },
    { label: 'Inventory Assign', icon: 'pi pi-warehouse', route: '/inventory-assign' },
    { label: 'Clients', icon: 'pi pi-users', route: '/clients' },
    { label: 'Admin', icon: 'pi-cog', route: '/admin' },
  ]
  isSubmitted = false;
  olpEmployees: any = []
  employeeHeader: any;
  showemployeeHeader = false;
  constructor(private fb: FormBuilder, private olpService: OlpService) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      joiningDate: ['', Validators.required],
      exitDate: [''],
      role: ['', Validators.required],
      routes:['',Validators.required],
      team: ['', Validators.required],
      status: [''],
      aadhar: [''],
      pan: [''],
      bloodGroup: [''],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      emergencyName: [''],
      emergencyRelation: [''],
      emergencyPhone: [''],
    });

  }
  ngOnInit(): void {
    this.getOLPEmployees()
  }
  getOLPEmployees() {
    this.olpService.getAllOLPEnquires('employee').subscribe((data: any) => {
      if (data) {
        this.olpEmployees = data
      }
    })
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
    this.showemployeeHeader = false;
    }
  }

  onReset() {
    this.adminForm.reset();
    this.isSubmitted = false;
  }

  onAddNewEmployee() {
    this.showemployeeHeader = true;
    this.employeeHeader = 'Add New Employee'
  }
}
