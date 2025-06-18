import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OlpService } from '../olp.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-olp-admin',
  templateUrl: './olp-admin.component.html',
  styleUrl: './olp-admin.component.css',
  standalone: false,
  providers: [MessageService]
})
export class OlpAdminComponent implements OnInit {
  adminForm: FormGroup;
  teams = [
    { name: 'Team A', value: 'A' },
    { name: 'Team B', value: 'B' },
    { name: 'Team C', value: 'C' },
    { name: 'Team D', value: 'D' },
    { name: 'Team E', value: 'E' }
  ];
  roles = [];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  statuses = ['Active', 'Inactive', 'On Leave'];
  genders = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Other', value: 'Other' }
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
  selectedUserData: any;
  olpEmployeeMode:any = 'Add';
  constructor(private fb: FormBuilder, private olpService: OlpService, private messageService: MessageService) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      joiningDate: ['', Validators.required],
      exitDate: [''],
      role: ['', Validators.required],
      routes: ['', Validators.required],
      team: ['', Validators.required],
      aadhar: ['', Validators.required],
      pan: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      emergencyName: ['', Validators.required],
      emergencyRelation: ['', Validators.required],
      emergencyPhone: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.getOLPEmployees();
    this.getOLPMaster();
  }
  getOLPEmployees() {
    this.olpService.getAllOLPEnquires('employee').subscribe((data: any) => {
      if (data) {
        this.olpEmployees = data
      }
    })
  }
  getOLPMaster() {
    this.olpService.getOLPMaster('OlpMaster/getOlpMaster').subscribe((data: any) => {
      this.roles = data.roles;
    })
  }
  isInvalid(field: string): boolean {
    const control = this.adminForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched || this.isSubmitted));
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.adminForm.valid) {
      this.olpService.saveOLPEmployee('Employee/create', this.convertOLPEmployee(this.adminForm.value),this.olpEmployeeMode).subscribe(
        (res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee saved successfully!' });
          this.getOLPEmployees();
          this.adminForm.reset();
          this.isSubmitted = false;
          this.showemployeeHeader = false;
        },
        (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save employee.' });
          this.getOLPEmployees();
          this.adminForm.reset();
          this.isSubmitted = false;
          this.showemployeeHeader = false;
        }
      );
    }
  }

  onReset() {
    this.adminForm.reset();
    this.isSubmitted = false;
    this.olpEmployeeMode = 'Add';
  }

  onAddNewEmployee() {
    this.showemployeeHeader = true;
    this.employeeHeader = 'Add New Employee';
    this.olpEmployeeMode = 'Add';
  }
  selectOLPEmployee(employee: any) {
    this.showemployeeHeader = true;
    this.employeeHeader = 'Edit Employee';
    this.olpEmployeeMode = 'Edit';
    this.selectedUserData = employee;
    this.adminForm.patchValue({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      joiningDate: new Date(employee.joiningDate),
      exitDate: employee.exitDate ? new Date(employee.exitDate) : null,
      role: employee.role,
      routes: employee.allowedRoutes,
      team: employee.teamId,
      aadhar: employee.aadhar,
      pan: employee.pan,
      bloodGroup: employee.bloodGroup,
      gender: employee.gender,
      dob: new Date(employee.dob),
      emergencyName: employee.emergencyContact?.name,
      emergencyRelation: employee.emergencyContact?.relation,
      emergencyPhone: employee.emergencyContact?.phone
    });
  }
  convertOLPEmployee(olpEmployee: any): any {
    return {
      name: olpEmployee.name,
      email: olpEmployee.email,
      phone: olpEmployee.phone,
      address: olpEmployee.address,
      joiningDate: olpEmployee.joiningDate,
      exitDate: olpEmployee.exitDate || null,
      role: {
        id: +olpEmployee.role.id,
        name: olpEmployee.role.name,
        description: olpEmployee.role.description
      },
      allowedRoutes: olpEmployee.routes.map((r: any) => ({
        label: r.label,
        icon: r.icon,
        route: r.route
      })),
      teamId: {
        name: olpEmployee.team.name,
        value: olpEmployee.team.value
      },
      aadhar: olpEmployee.aadhar,
      pan: olpEmployee.pan,
      bloodGroup: olpEmployee.bloodGroup,
      gender: {
        name: olpEmployee.gender.name,
        value: olpEmployee.gender.value
      },
      dob: olpEmployee.dob,
      emergencyContact: {
        name: olpEmployee.emergencyName,
        relation: olpEmployee.emergencyRelation,
        phone: olpEmployee.emergencyPhone
      }
    };
  }

}
